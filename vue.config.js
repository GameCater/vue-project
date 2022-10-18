const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置代理服务器
  devServer: {
    host: "127.0.0.1",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // 设置请求头
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // 配置多个代理
    proxy: {
      "/api": {
          target: "http://localhost:6600", // 要访问的接口域名
          ws: false, // 是否启用websockets
          changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRewrite: {
              //"^/api": "" 
              //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
          }
      },
    }
  }
})
