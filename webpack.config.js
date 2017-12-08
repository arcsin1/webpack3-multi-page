const webpack = require('webpack') 
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const utils = require('./config/utils')

// 获取所有入口文件配置
const entryConfig = require('./config/entrys')
// 获取输出配置
const basePlugin = require('./config/base.plugin')

module.exports = {
  devtool: '#source-map',
  entry: entryConfig,
  output: {
    filename: 'static/js/[name][hash].js',
    chunkFilename: 'static/js/[id].chunk.js',
    path: path.join(__dirname, 'dist'),
        // publicPath 上线替换真实的http,如果设置为/则需把dist下的文件放在项目的根目录
        // publicPath:'http://localhost:3000/'
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true, // css压缩
              },
            },
          ],
        }),
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs=img:src img:data-src',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]'),
        },
      },
    ],
  },
  plugins: basePlugin,
  externals: {
    react: 'var React',
    'react-dom': 'var ReactDOM',
  },
  devServer: {
    contentBase: './',
    host: 'localhost',
    compress: true,
    port: 3000,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}
