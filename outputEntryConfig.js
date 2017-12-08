
const fs = require('fs')
const path = require('path')

// 入口文件
const entryFiles = {}
function eachEntryFile(dir) {
  try {
    fs.readdirSync(dir).forEach(file => {
      const filePath = `${dir}/${file}`
      const fileName = path.basename(file, '.js')
      entryFiles[fileName] = filePath
    })
  } catch (e) {
    throw new Error(e)
  }
}
eachEntryFile('./src/projects')

// 写入entry配置文件
const entrysStr = `module.exports=${JSON.stringify(entryFiles)}`

fs.writeFile('./config/entrys.js', entrysStr, e => {
  if (e) { throw new Error(e) }
})


// 输出html模板  统一放在templates下面的后面调用处理
const pagesArray = []
function eachFile(dir) {
  try {
    fs.readdirSync(dir).forEach(file => {
      const fileObj = {}
      const filePath = `${dir}/${file}`
      const chunkName = path.basename(file, '.html')
      fileObj.filename = file
      fileObj.template = filePath
      fileObj.chuckName = chunkName
      pagesArray.push(fileObj)
    })
  } catch (e) {
    throw new Error(e)
  }
}


eachFile('./src/templates')

const htmlsPluginStr = `module.exports=${JSON.stringify(pagesArray)}`
fs.writeFile('./config/htmlPages.js', htmlsPluginStr, err => {
  if (err) throw err
  console.log('写入配置成功，可以进行打包了')
})
