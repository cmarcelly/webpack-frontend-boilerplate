module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 2 versions',
            'features': {
                'custom-properties': false
            }
        },
    },
}
