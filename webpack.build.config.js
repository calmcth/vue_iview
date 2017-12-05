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
var CleanPlugin = require('clean-webpack-plugin');
//提取公用CSS
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToSrc = path.resolve(__dirname, 'src');
var pathToBuild = path.resolve(__dirname, 'www');
var config = {
    //pathToBuild: pathToBuild,
    devtool: false,
    //入口文件配置
    entry: {
        app: [
            path.resolve(__dirname, 'src/app.js')
        ],
        common: [
            "vue",
            "vuex",
            "axios",
            "vue-router",
            "iview"
        ]
    },
    /***
     * 输出文件配置{path是指文件的输出绝对路径,publicPath:编译文件指向的访问路径} 
     * path + publicPath 列子:http://127.0.0.1:8989/index.html
     **/
    output: {
        path: path.resolve(__dirname, 'www'),
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js)?$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src'),path.resolve(__dirname, 'node_modules/iview'),path.resolve(__dirname,'node_modules/vue-echarts-v3/src')]
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
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
            },
            { test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query:{limit:'100',name:'static/image/[name].[ext]'}
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".vue"], //当requrie的模块找不到时，添加这些后缀
        //设置别名
        alias: {
            "utilities": path.resolve(__dirname, 'src/utilities/')
        }
    },
    //外部环境依赖。不合并此文件
    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/
    plugins: [
        new CleanPlugin(['www']),
        new CopyWebpackPlugin([
            {from:__dirname+'/static',to:__dirname+"/www/static"}
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new ExtractTextPlugin("app.css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js"
        }),
        new HtmlWebpackPlugin({
            title: 'sms-client',
            addLinkCss: ['/static/styles/iview.css'],
            template: './template/index.build.ejs',//本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)
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
