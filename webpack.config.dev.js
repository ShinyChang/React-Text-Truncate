var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'src', 'index')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }]
    }
};
