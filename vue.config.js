const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    extract: false
  },
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: 'localhost',
    // host: '192.168.82.64',
    port: 8086, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)));

    config.resolve.alias
    .set('@', resolve('/src'))
    .set('@pages', resolve('/src/pages'))
    .set('@components', resolve('/src/components'))
    .set('@common', resolve('/src/common'))
    //.set('@libs', resolve('public/libs'))
  },


};

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/common/stylus/mixins.styl'),
        //path.resolve(__dirname, './src/common/stylus/index.styl'),
      ],
    })
}
