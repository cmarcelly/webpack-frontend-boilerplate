const path = require('path');

module.exports = {
    // Source Folder
    src: path.resolve(__dirname, '../src'),

    // Production Build Folder
    build: path.resolve(__dirname, '../dist'),

    // Media Files Source Folder
    src_media: path.resolve(__dirname, '../src/assets/img'),

    // Media Files Build Folder
    build_media: path.resolve(__dirname, '../dist/assets/img'),

    // Spritemap Relative Path
    spritemap: '/assets/img',
}