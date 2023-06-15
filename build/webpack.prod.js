const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(base, {
    mode: 'production',
    plugins: [
        // 抽离 css
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css', 
        }),
    ],
})