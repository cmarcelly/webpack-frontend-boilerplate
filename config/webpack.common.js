const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ImageminWebpWebpackPlugin= require('imagemin-webp-webpack-plugin');

const paths = require('./paths');

module.exports = {
    entry: [paths.src + '/styles/main.scss', paths.src + '/scripts/app.js'],
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
                    from: paths.src_media + '/**/*',
                    to: paths.build_media + '/[name][ext]',
                    globOptions: {
                        ignore: ['*.DS_Store', paths.src_media + '/**/*.json'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        new ImageminWebpWebpackPlugin([
            {
                config: [{
                    test: /\.(jpe?g|png)/,
                    options: {
                        quality: 75
                    }
                }],
                overrideExtension: true,
                detailedLogs: false,
                silent: false,
                strict: true,
            }
        ]),
        new WebpackManifestPlugin({
            filter: (file) => file.path.match(/\.(css|js)$/),
        }),
        new HtmlWebpackPlugin(),
    ],
    output: {
        path: paths.build,
        publicPath: '/',
    },
};
    