const path = require("path");
const webpack = require("webpack");

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), "build"),
      publicPath: "/"
    },
    options.output
  ),
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ["app", "server", "node_modules"],
    extensions: [".js", ".jsx", ".react.js", ".es6", ".babel", ".node"],
    mainFields: ["browser", "jsnext:main", "main"]
  },
  target: "web",
  performance: options.performance || {}
});
