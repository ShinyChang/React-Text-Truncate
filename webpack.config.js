var path = require('path');
var webpack = require('webpack');
var node_dir = __dirname + '/node_modules';

module.exports = {
    devtool: 'source-map',
    entry: {
        'bundle': ['./src/index.js'],
        'truncate-text': ['./src/TruncateText.js']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        }),
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
    externals: {
        react: 'React',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel?stage=0'],
            include: path.join(__dirname, 'src')
        }]
    }
};
