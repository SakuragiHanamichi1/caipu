// const data = require('./data.json')

module.exports = {
    devServer: {
        open: false,
        // 设置主机地址
        host: '0.0.0.0',
        // host: 'localhost',
        // 设置默认端口
        port: 8080,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            '/api': {
                // 目标 API 地址
                // target: 'https://zyuanyuan.com/',
                target: 'http://keuaile75.top:3001/',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
        },
        // configureWebpack: {
        //     devServer: {
        //         before(app) {
        //             app.get('/hot', function (req, res) {
        //                 res.json({
        //                     code: 1, // 模拟真实企业网络请求的权限问题
        //                     data: data.newslist
        //                 });
        //             });
        //         }
        //     }
        // }
    },
   
}