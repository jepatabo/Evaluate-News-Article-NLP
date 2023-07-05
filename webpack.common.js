const webpack = require("webpack"),
  path = require("path");
HtmlWebpackPlugin = require("html-webpack-plugin");
({ CleanWebpackPlugin } = require("clean-webpack-plugin"));
({ merge } = require("webpack-merge"));
//workbox plugin SW
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),

    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: false,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    // new instance
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js", // Specify a custom service worker file name
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
