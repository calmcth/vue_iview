'use strict';

/**
 * Created by x on 11/23/15.
 */
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var IPv4="127.0.0.1";
var open = require('open');
var compiler = webpack(config);
/***
 * publicPath 启动服务的资源路径
 */
var server = new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname,'www'),
    compress: true,
    hot: true,
    public:IPv4,
    publicPath: config.output.publicPath,
    open: true,
    inline: true
});
server.listen(9090, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at ${IPv4}:9090/index.html`);
    open(`http://${IPv4}:9090/index.html`);
});