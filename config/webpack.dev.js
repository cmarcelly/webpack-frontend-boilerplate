const { merge } = require('webpack-merge');
const paths = require('./paths.js');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: paths.build,
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 1, modules: true },
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new BrowserSyncPlugin(
        {
            host: 'localhost',
            port: 3000,
            // server: { baseDir: [paths.build] }
            proxy: 'http://localhost:8080/'
        },
        {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: false,
            injectCss: true,
        })
    ],
});
    