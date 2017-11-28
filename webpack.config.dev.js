'use strict';

/**
 * Created by x on 11/23/15.
 */
var path = require('path');

/**
 * 导入文件入口
 * @type {{index: string, details: string}|exports|module.exports}
 */
var webpack = require('webpack');
//提取公用CSS
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var node_modules = path.resolve(__dirname, 'node_modules');
var config = {
    //pathToBuild: pathToBuild,
    devtool: "source-map",
    //入口文件配置
    entry: {
        common: [
            "vue",
            "vuex",
            "axios",
            "vue-router",
            "iview"
        ],
        app: [
            path.resolve(__dirname, 'src/app.js')
        ]
    },
    /***
     * 输出文件配置{path是指文件的输出绝对路径,publicPath:编译文件指向的访问路径} 
     * path + publicPath 列子:http://127.0.0.1:8989/index.html
     **/
    output: {
        path: path.resolve(__dirname, 'www'),
        chunkFilename: '[name].js',
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js)?$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: [
                    "css-loader",
                    "style-loader",
                    "less-loader"
                ]
            },
           {
               test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query:{limit:'100'}
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: [".js",".vue"], //当requrie的模块找不到时，添加这些后缀
         //设置别名
        alias:{
             "utilities": path.resolve(__dirname,'src/utilities/')
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {from:__dirname+'/static',to:__dirname+"/www/static"}
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js"
        }),
        /**
         * 组件热刷新
         */
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'vue ui组件',
            addLinkCss: ['/static/styles/iview.css'],
            template: './template/index.ejs',
            hash: true,    //为静态资源生成hash值
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunks: ['common', 'app'],
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        })
    ]
};


module.exports = config;
