var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel?stage=0'],
            include: path.join(__dirname, 'src')
        }]
    }
};
