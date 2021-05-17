const { merge } = require('webpack-merge');
const paths = require('./paths.js');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: paths.build,
        writeToDisk: true,
    },
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
                            sourceMap: true, 
                            importLoaders: 1, 
                            modules: true 
                        },
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
        }),
        new BrowserSyncPlugin(
        {
            host: 'localhost',
            port: 3000,
            server: { baseDir: [paths.build] }
            // proxy: 'http://localhost:8080/'
        },
        {
            reload: true,
        })
    ],
    output: {
        filename: 'scripts/[name].bundle.js',
    },
});
    