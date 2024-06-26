const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/order/pay/card',{
            target: 'https://prod.match-api-server.com',
            changeOrigin: true,
        }),
    );
};