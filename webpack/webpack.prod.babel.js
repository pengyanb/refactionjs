const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("./webpack.base.babel")({
  entry: ["babel-polyfill", path.join(process.cwd(), "app/app.js")],

  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js"
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: "app/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ],

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
});
