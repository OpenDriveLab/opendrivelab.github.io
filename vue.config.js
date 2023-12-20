const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // assetsPublicPath: './',
  // publicPath:'../../',
  publicPath: './',
})

module.exports = {
  // 选项
  //  基本路径
  publicPath: "./",
  //  构建时的输出目录
  outputDir: "dist",
  //  放置静态资源的目录
  assetsDir: "static",
  //  html 的输出路径
  indexPath: "index.html",
  //文件名哈希
  filenameHashing: true,
  lintOnSave: false,
  //  是否使用带有浏览器内编译器的完整构建版本
  runtimeCompiler: false,
  //  babel-loader 默认会跳过 node_modules 依赖。
}
