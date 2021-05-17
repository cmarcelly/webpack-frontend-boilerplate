const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
            cacheFolder: path.resolve('./.cache'),
            test: /\.(jpe?g|png|gif|svg)$/i,
            gifsicle: { 
                optimizationLevel: 3 
            },
            optipng: { 
                optimizationLevel: 7 
            },
            pngquant: {
                quality: '65-90', 
                speed: 4,
            },
            svgo: {
                plugins: [
                    { cleanupIDs: false },
                    { cleanupAttrs: false },
                    { removeViewBox: false },
                    { removeUnknownsAndDefaults: false },
                    { removeUselessDefs: false },
                ],
            },
            plugins: [
                ImageminMozjpeg({
                    quality: 75,
                    progressive: true
                })
            ]
        }),
        new FaviconsWebpackPlugin({
            logo: paths.src_media + '/favicons/favicon.png',
            cache: path.resolve('./.cache'),
            outputPath: paths.build_favicon,
            mode: 'webapp',
            favicons: {
                appName: '',
                appShortName: '',
                theme_color: '#FFFFFF',
                icons: {
                    'android': [
                        'android-chrome-192x192.png',
                        'android-chrome-512x512.png',
                    ],
                    'appleIcon': [
                        'apple-touch-icon-180x180.png',
                    ],
                    'favicons': [
                        'favicon.ico',
                        'favicon-16x16.png',
                        'favicon-32x32.png',
                    ],
                    'windows': [
                        'mstile-150x150.png',
                    ],
                    appleStartup: false,
                    coast: false,
                    firefox: false,
                    yandex: false
                }
            },
        }),
    ],
    output: {
        filename: 'scripts/[name].[contenthash].bundle.js',
    },
});
    