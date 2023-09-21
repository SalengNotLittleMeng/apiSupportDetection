let path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    "ApiSupport.min": "./app.js",
    "ApiSupport": "./app.js",
},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: '/node_modules/'
      }
    ],
  },
  output: 
    {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      globalObject: "this",
      library: "ApiSupport",
      libraryTarget: "umd",
    },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: 'source-map',
  mode: "none", 
  optimization: {
    minimize: true, 
    minimizer: [
      new TerserPlugin({
        test: /\.min.js$/, 
      }),
    ],
  },
};
