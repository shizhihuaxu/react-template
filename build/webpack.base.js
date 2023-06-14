const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    target: 'web', // default config
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ], // to use without extension name
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader', 'postcss-loader' ],
            },
            {
                test: /\.scss$/i,
                use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            title: 'react template',
        }),
        new ESLintPlugin({
            extensions: [ 'js', 'jsx', 'ts', 'tsx' ],
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    // 查看编译结果用
    // optimization: {
    //     minimize: false,
    // },
}