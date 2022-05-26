const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                            url: false,
                            importLoaders: 2,
                            sourceMap: false,
                            modules: false,
                        },
                    },
                    'postcss-loader',
                    { loader: 'sass-loader',
                        options: {
                            additionalData: '$env: ' + process.env.SERVER_ENV + ';'
                        }
                    },
                ],
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
        // new ImageminPlugin({
        //     cacheFolder: path.resolve('./.cache'),
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     gifsicle: {
        //         optimizationLevel: 3
        //     },
        //     optipng: {
        //         optimizationLevel: 7
        //     },
        //     pngquant: {
        //         quality: '65-90',
        //         speed: 4,
        //     },
        //     svgo: {
        //         plugins: [
        //             { cleanupIDs: false },
        //             { cleanupAttrs: false },
        //             { removeViewBox: false },
        //             { removeUnknownsAndDefaults: false },
        //             { removeUselessDefs: false },
        //         ],
        //     },
        //     plugins: [
        //         ImageminMozjpeg({
        //             quality: 75,
        //             progressive: true
        //         })
        //     ]
        // }),
    ],
    output: {
        filename: 'scripts/[name].[contenthash].bundle.js',
    },
});
