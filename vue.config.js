module.exports = {
  chainWebpack: config => {
   config.module
    .rule('scss')
    .use('sass-loader')
    .tap(options =>
     merge(options, {
      includePaths: [path.resolve(dirname, 'node_modules')],
     })
    )
  }
 }
module.exports = {
  css: {
    extract: process.env.NODE_ENV === 'production',
    modules: true,
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/_variable.scss";
        `
      }
    }
  }
}
module.exports = {
  devServer: {
    proxy: {
      '/sys': {
        //target: "http://hnxx.xianwanghuyu.com", //对应自己的接口
        target: "http://127.0.0.1:8098", //对应自己的接口
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}