var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'react-router-redux', 'redux', 'redux-thunk']
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].dll.js",
        library: "[name]"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};