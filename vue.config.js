const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/app/wechat/view/salary_game/'
    //     : '/',
    assetsDir: "static",
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('static', resolve('src/static'))
            .set('components', resolve('src/components'))
            .set('layout', resolve('src/layout'))
    },
}