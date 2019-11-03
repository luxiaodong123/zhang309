const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const dllReference = (config) => {
  config.plugin('vendorDll')
    .use(webpack.DllReferencePlugin, [{
      context: __dirname,
      manifest: require('./public/vendor/vendor-manifest.json')
    }])

  config.plugin('addAssetHtml')
    .use(AddAssetHtmlPlugin, [
      [{
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        outputPath: './vendor',
        publicPath: './vendor'
      }]
    ])
    .after('html')
}

// vue.config.js
module.exports = {
  //baseUrl: './',//vue-cli3.3以下版本使用
  publicPath: './', //vue-cli3.3+新版本使用
  outputDir: 'dist', // 打包的目录
  assetsDir: 'assets',
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  pages: {
    //配置多入口
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    //home的入口
    // home: {
    //   // page 的入口
    //   entry: 'src/main.js',
    //   // 模板来源
    //   template: 'public/index.html',
    //   // 在 dist/index.html 的输出
    //   filename: 'index.html',
    //   // 当使用 title 选项时，
    //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   title: 'Index Page',
    //   // 在这个页面中包含的块，默认情况下会包含
    //   // 提取出来的通用 chunk 和 vendor chunk。
    //   chunks: ['chunk-vendors', 'chunk-common', 'index']
    // },
  },
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8085, // 服务端口
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  // webpack配置
  chainWebpack: config => {
    config
      .resolve.alias
      .set('@js', resolve('src/assets/js')) //设置别名
      .set('@less', resolve('src/assets/less')) //设置别名
      .set('@img', resolve('src/assets/img')); //设置别名
    config
      .plugin('provide')
      .use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }]);
    if (process.env.NODE_ENV === 'production') {
      dllReference(config)
    }
  },
  configureWebpack: config => {
    //打包时去除打印信息（console）
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })]
      }
      Object.assign(config, {
        optimization
      });
      //警告 webpack 的性能提示
      Object.assign(config, {
        performance: {
          hints: 'warning',
          //入口起点的最大体积 整数类型（以字节为单位）
          maxEntrypointSize: 50000000,
          //生成文件的最大体积 整数类型（以字节为单位 300k）
          maxAssetSize: 30000000,
          //只给出 js 文件的性能提示
          assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
          }
        }
      });
    }
  },
  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {},
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // pass options to less-loader
      less: {
        // 引入全局变量样式
        data: `@import "@less/common/common.main.less;`
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
}