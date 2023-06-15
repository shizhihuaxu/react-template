const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
    target: 'web', // default config
    entry: './src/index.tsx',
    output: {
        path: resolve('../dist'),
        filename: 'static/[name].[chunkhash].js',
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ], // to use without extension name
        alias: {
            '@': resolve('../src'),
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
                exclude: /node_modules/,
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