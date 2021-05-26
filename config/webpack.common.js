const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const paths = require('./paths');

module.exports = {
    entry: [
        paths.src + '/styles/main.scss',
        paths.src + '/scripts/app.js',
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.njk$/,
                use: [
                    {
                        loader: 'simple-nunjucks-loader',
                        options: {
                            tags: {
                                // Prevent Conflicts with Vue Data Binding
                                variableStart: '<$',
                                variableEnd: '$>'
                            },
                        }
                    }
                ]
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
                        ignore: ['*.DS_Store', paths.src_media + '/svg/icons/**/*.svg', paths.src_media + '/favicons/**/*', paths.src_media + '/**/*.json'],
                    },
                    noErrorOnMissing: true,
                },
                {
                    from: paths.src + '/assets/fonts/**/*',
                    to: paths.build + '/assets/fonts/[name][ext]',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
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
        // new HtmlWebpackPlugin({
        //     template: path.resolve('./src/views/index.njk'),
        //     templateParameters: {
        //         title: 'Joe'
        //     }
        // }),
        ...require('fast-glob').sync('*.njk', {cwd: `${paths.src}/views/`}).map(
        (file) => new HtmlWebpackPlugin({
            template: `${paths.src}/views/` + file,
            filename: file.split('.')[0] + '.html',
            templateParameters: {
                title: 'Joe'
            }
        })),
        new FaviconsWebpackPlugin({
            logo: paths.src_media + '/favicons/favicon.png',
            cache: path.resolve('./.cache'),
            outputPath: paths.build_favicon,
            devMode: 'light',
            prefix: 'assets/favicons/',
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
        path: paths.build,
        publicPath: '/',
    },
};
    