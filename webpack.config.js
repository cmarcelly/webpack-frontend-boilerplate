const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: __dirname + '/dist',
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
};
    