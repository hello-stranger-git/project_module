const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons/svg')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(svg)(\?.*)?$/,
          exclude: [path.resolve('src/assets/icons')],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 把px单位换算成rem单位
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数(设计图375的根字体为12)
            // selectorBlackList: ['.van'], // 要忽略的选择器并保留为px。
            propList: ['*'], // 可以从px更改为rem的属性。
            // minPixelValue: 2, // 设置要替换的最小像素值。
            unitPrecision: 10
          })
        ]
      }
    }
  }
}
