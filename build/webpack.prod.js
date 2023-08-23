const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { getEnv } = require('./utils')

module.exports = merge(base, {
    mode: 'production',
    plugins: [
        // 抽离 css
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env': getEnv('.env.production'),
        }),
    ],
})
