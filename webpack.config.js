var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }]
    }
};
