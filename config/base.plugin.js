
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 开发环境
const isDev = function () {
  return process.env.NODE_ENV.trim() === 'development'
}

// 生产环境
const isProd = function () {
  return process.env.NODE_ENV.trim() === 'production'
}
// html页面 pagesArray
const pagesArray = require('./htmlPages')

let basePlugin = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    chunks: ['pageA', 'pageB', 'pageC'], // 提取公用模块
    minChunks: Infinity,
  }),
  new ExtractTextPlugin({
        // 生成css文件名
    filename: 'static/css/[name].css',
    disable: false,
    allChunks: true,
  }),
]

const commonPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    output: false,
    compress: {
      unused: true,
      dead_code: true,
      pure_getters: true,
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      comparisons: true,
      sequences: true,
      evaluate: true,
      join_vars: true,
      if_return: true,
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true,
  }),
]

/* 遍历页面，添加配置 */
pagesArray.forEach(page => {
  const htmlPlugin = new HtmlWebpackPlugin({
    template: page.template,
    filename: page.filename,
    chunks: ['vendors', page.chuckName],
        // hash:true,
    minify: {
      removeComments: true,
      collapseWhitespace: false, // 删除空白符与换行符
    },
  })

  basePlugin.push(htmlPlugin)
})

if (isProd) {
  basePlugin = basePlugin.concat(commonPlugins)
} 


module.exports = basePlugin
