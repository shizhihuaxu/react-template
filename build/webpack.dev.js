const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')
const { getEnv } = require('./utils')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        // https://blog.csdn.net/zwkkkk1/article/details/83411071
        historyApiFallback: true,
        open: true,
        proxy: {
            '/api/v1': {
                target: 'your url',
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': getEnv('.env.development'),
        }),
    ],
})
