const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
    entry: [paths.src + '/index.js'],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
};
    