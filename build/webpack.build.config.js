var webpack = require("webpack");
var path = require('path')
var version = require("./../package.json").version;
var banner = "/**\n" + " * vuetable-2 v" + version + "\n" + " * https://github.com/ratiw/vuetable-2\n" + " * Released under the MIT License.\n" + " */\n";
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");

var utils = require('./utils')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

var cssFileName = "vuetable-2.css";

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: true,extract: true})
  },
  entry: path.join(__dirname, '..', "src/index.js"),
  output: {
    path: path.join(__dirname, '..', "dist"),
    filename: "vuetable-2.js",
    library: "Vuetable",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap:true,
      comments: false,
      beautify: false
    }),
    new webpack.BannerPlugin({
      banner: banner,
      raw: true
    }),
    new ExtractTextPlugin({filename: cssFileName, allChunks: true}),
    new StatsPlugin({
      fileName: "../stats.json",
      chunkModules: true
    })
  ],
  resolve: {
    aliasFields: ["browser"]
  }
});
