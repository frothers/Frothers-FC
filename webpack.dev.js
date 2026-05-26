const { merge } = require("webpack-merge");
const webpack = require('webpack');
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require('dotenv').config({ path: './.env' });

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  output: {
    filename: "[name].js",
    chunkFilename: "[id].css",
  },

  devServer: {
    port: process.env.PORT || 1313,
    static: {
      directory: path.join(process.cwd(), "./dist"),
      watch: true,
    },
    open: true,
    allowedHosts: "all",
    historyApiFallback: {
      rewrites: [{from: /./, to: "404.html"}]
    }
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "dist/**/*.js",
        "dist/**/*.css",
        "data/webpack.json"
      ]}),
      new webpack.DefinePlugin({
        'process.env': {
            TINA_CLIENT_ID: process.env.TINA_CLIENT_ID,
            TINA_TOKEN: process.env.TINA_TOKEN,
        },
      }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
});
