const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  output: {
    filename: "[name].js",
    chunkFilename: "[id].css",
  },

  devServer: {
    port: process.env.PORT || 1313,
    static: path.resolve(process.cwd(), "./dist"),

    open: true,
    allowedHosts: "auto",
    historyApiFallback: {
      rewrites: [{from: /./, to: "404.html"}]
    }
  },
  infrastructureLogging: {
    level: 'verbose',
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "dist/**/*.js",
        "dist/**/*.css",
        "data/webpack.json"
      ]}),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
});
