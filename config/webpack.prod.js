const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

const paths = require('./paths');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: true,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
        new ImageminPlugin({ 
            cacheFolder: path.resolve('./cache'),
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '65-80'
            },
            plugins: [
                ImageminMozjpeg({
                    quality: 60,
                    progressive: true
                })
            ]
        }),
    ],
    output: {
        filename: 'scripts/[name].[contenthash].bundle.js',
    },
});
    