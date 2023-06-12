const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        // https://blog.csdn.net/zwkkkk1/article/details/83411071
        historyApiFallback: true,
        open: true,
    },
})