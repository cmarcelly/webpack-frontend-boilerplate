const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.media,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        new HtmlWebpackPlugin(),
    ],
    output: {
        path: paths.build,
        publicPath: '/',
    },
};
    