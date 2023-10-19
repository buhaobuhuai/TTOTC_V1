// // vue.config.js
// // path引入
const path = require('path');

const {
    defineConfig
} = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {

    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8089,
        open: false,
        https:false,
        hot:true,
        proxy: {
            '/api': {
                // 要请求的后端接口
                target: 'http://localhost:12000',
                ws: true, // 用于支持websocket，不写默认为true
                // 开启跨域
                changeOrigin: true,
                // secure: true, // 如果是 https,需要开启这个选项
                // 替换 target 中的请求地址，也就是说，以后请求地址时候，直接写成/api即可
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        // 添加后， WebSocket 就不会报错了
    
    client: {
            webSocketURL: 'ws://0.0.0.0:8089/ws'
        },
      headers: {
        'Access-Control-Allow-Origin': '*',
      }

    },
    css: {
        loaderOptions: {
          // 给 sass-loader 传递选项
          sass: {
            // @/ 是 src/ 的别名
            // 所以这里假设你有 `src/variables.sass` 这个文件
            // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
            additionalData: `@import "~@/variables.sass"`
          },
          // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
          // 因为 `scss` 语法在内部也是由 sass-loader 处理的
          // 但是在配置 `prependData` 选项的时候
          // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
          // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
          scss: {
            additionalData: `@import "~@/assets/css/variables.scss";`
          },
          // 给 less-loader 传递 Less.js 相关选项
          // less:{
          //   additionalData: `@import "~@/assets/css/style.less";`,
          // }
        }
      },
    // pluginOptions: {
    //     "style-resources-loader": {
    //         preProcessor: "less",
    //               patterns: [
    //                 // 全局变量路径
    //                 path.join(__dirname, "@/assets/css/style.less"),
    //               ],

    //     }
    // },
    configureWebpack: {
        plugins: [new NodePolyfillPlugin()]
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // config.externals(externals)
            // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
            // config.plugin('html')
            //   .tap(args => {
            //     args[0].cdn = cdn
            //     return args
            //   })
            // config.plugin('CompressionPlugin').use('compression-webpack-plugin', [{
            //     filename: '[path][base].gz',
            //     algorithm: 'gzip',
            //     test: /\.js$|\.css$|\.html$/,
            //     threshold: 10240, // 只处理比这个值大的资源。按字节计算
            //     minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
            // }])
            config
                .optimization.splitChunks({
                    chunks: 'all', // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
                    maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
                    minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
                    maxSize: 60000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
                    cacheGroups: {
                        styles: {
                            name: 'styles',
                            test: /\.(s?css|less|sass)$/,
                            chunks: 'all',
                            priority: 10
                        },
                        common: {
                            name: 'chunk-common',
                            // chunks: 'all',
                            minChunks: 2, // 拆分前必须共享模块的最小 chunks 数。
                            // maxInitialRequests: 5, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
                            // minSize: 0, // 生成 chunk 的最小体积（≈ 20kb)
                            priority: 1, // 优化将优先考虑具有更高 priority（优先级）的缓存组
                            reuseExistingChunk: true // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
                        },
                        vendors: {
                            name: 'chunk-vendors',
                            test: /[\\/]node_modules[\\/]/,
                            // chunks: 'all',
                            priority: -10,
                            reuseExistingChunk: true
                        },
                        lrucache: {
                            name: 'chunk-lrucache',
                            test: /[\\/]node_modules[\\/]_?lru-cache(.*)/,
                            // chunks: 'all',
                            priority: 3,
                            reuseExistingChunk: true
                        }
                    }
                })
        }
    }
}
