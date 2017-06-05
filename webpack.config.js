var path = require("path");
var webpack = require("webpack");
var PROD = process.env.NODE_ENV === "production";
module.exports = {
   entry: {
      app: ["./src/index.tsx"]
   },
   output: {
      path: path.resolve(__dirname, './public'),
      filename: "bundle.js",
   },
   plugins: PROD ? [
      new webpack.optimize.UglifyJsPlugin({
         compress: { warnings: false }
      })
   ] : [],
   module: {

      loaders: [
         {
            test: /\.json$/,
            loader: 'json-loader'
         },
         {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
         }
      ]
   },

   resolve: {
      extensions: [".tsx", ".ts", ".js"]
   },
   devServer: {
      disableHostCheck: true,
      historyApiFallback: true,
      open: true, // to open the local server in browser
      contentBase: __dirname + '/public',

   },
   externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
   }
};