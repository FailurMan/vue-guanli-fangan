// const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target:
          "https://console-mock.apipost.cn/app/mock/project/69865925-094d-484b-bdeb-a5104e2eeaf7/",
        changeOrigin: true, // 是否跨域
      },
    },
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  configureWebpack: {
    resolve: {
      alias: {
        //引用path模块
        path: require.resolve("path-browserify"),
      },
    },
  },
};
