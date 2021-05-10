const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ImageminWebpWebpackPlugin= require('imagemin-webp-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

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
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.src_media + '/**/*',
                    to: paths.build_media + '/[name][ext]',
                    globOptions: {
                        ignore: ['*.DS_Store', paths.src_media + '/svg/icons/**/*.svg', paths.src_media + '/**/*.json'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        // TODO: Exclude files that comes from the "lossless" directory
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
            },
        ]),
        new SVGSpritemapPlugin(
            paths.src_media + '/svg/icons/**/*.svg',
            {
                output: {
                    filename: paths.spritemap + '/spritemap.svg',
                    chunk: {
                        name: 'spritemap.svg',
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
                }, 
            },
        ),
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
    