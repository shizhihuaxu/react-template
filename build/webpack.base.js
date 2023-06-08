const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    target: 'web', // default config
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // to use without extension name
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico',
            title: 'react template'
        })
    ],
};