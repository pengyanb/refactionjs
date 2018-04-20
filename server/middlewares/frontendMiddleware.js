const express = require("express");
const path = require("path");
const compression = require("compression");
const pkg = require(path.resolve(process.cwd(), "package.json"));

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  webpackConfig.mode = "development";
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  // console.log("middleware: ", webpackConfig);
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: "errors-only"
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const fs = middleware.fileSystem;

  app.get("*", (req, res) => {
    fs.readFile(path.join(compiler.outputPath, "index.html"), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || "/";
  const outputPath = options.outputPath || path.resolve(process.cwd(), "build");

  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(outputPath, "index.html"))
  );
};

module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require("../../webpack/webpack.dev.babel");
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
