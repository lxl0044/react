const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    entry: {
        Route: './modules/Route',
        // vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'react-router-redux', 'redux', 'redux-thunk']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: ['es3ify-loader', 'babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: ["style-loader", "postcss-loader"],
                    use: ["css-loader"]
                })
            }, {
                test: /\.(jpe?g|png|gif|svg|bmp)$/i,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[ext]'
            }]
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        hot: false,
        inline: false,
        progress: true
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js', '.css']
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./manifest.json")
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './templates/index.html',
            favicon: './images/favicon.ico',
            hash: true,
            // 指定要加载的模块
            chunks: ['Route'],
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('./dist/vendor.dll.js'),
            includeSourcemap: false
        }),
        // 分割require的css文件，重命名为style.css 并引入(只能分割一个css文件)
        new ExtractTextPlugin({
            allChunks: true,
            filename: "[name].css"
        })
    ]
}
