const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const plugins = [
  new webpack.HotModuleReplacementPlugin(), // hot reloading
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    templateContent: templateContent()
  }),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false // show a warning when there is a circular dependency
  })
];

module.exports = require("./webpack.base.babel")({
  entry: [
    "babel-polyfill",
    "eventsource-polyfill", // Necessary for hot reloading with IE
    "webpack-hot-middleware/client?reload=true",
    path.join(process.cwd(), "app/app.js") // Start with js/app.js
  ],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  plugins: plugins,

  // Tell babel that we want to hot-reload
  babelQuery: {
    // require.resolve solves the issue of relative presets when dealing with
    // locally linked packages. This is an issue with babel and webpack.
    // See https://github.com/babel/babel-loader/issues/149 and
    // https://github.com/webpack/webpack/issues/1866
    presets: ["babel-preset-react-hmre"].map(require.resolve)
  },
  devtool: "cheap-module-eval-source-map",

  performance: {
    hints: false
  },
  optimization: {
    minimize: false
  },
  mode: "development"
});

function templateContent() {
  const html = fs
    .readFileSync(path.resolve(process.cwd(), "app/index.html"))
    .toString();
  return html;
}
