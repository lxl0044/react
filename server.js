var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config.js');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3002, function(err) {
    if (err) {
        console.log(err)
        return;
    }
});
