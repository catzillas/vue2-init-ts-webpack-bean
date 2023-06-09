var path = require('path');
var webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/', filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/, loader: 'vue-loader',
        options: { loaders: {} }
      },
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/, options: { appendTsSuffixTo: [/\.vue$/] } },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: { vue$: 'vue/dist/vue.esm.js' }
  },
  devServer: { historyApiFallback: true, noInfo: true },
  performance: { hints: false },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || [])
    .concat([new webpack.DefinePlugin(
      { 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new BundleAnalyzerPlugin()
    ]);
}
