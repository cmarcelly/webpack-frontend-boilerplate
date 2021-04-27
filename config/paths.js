const path = require('path');

module.exports = {
    // Source files
    src: path.resolve(__dirname, '../src'),

    // Production build files
    build: path.resolve(__dirname, '../dist'),

    // Media files
    src_media: path.resolve(__dirname, '../src/assets/img'),
    build_media: path.resolve(__dirname, '../dist/assets/img'),

    // Static files that get copied to build folder
    public: path.resolve(__dirname, '../public'),
}