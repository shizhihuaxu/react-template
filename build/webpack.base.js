const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { resolve } = require('./utils')

// NOTE 这里的 env 是由命令行参数配置的，非 env 文件配置的
const isDev = process.env.NODE_ENV === 'dev'

module.exports = {
    stats: 'errors-warnings',
    target: 'web', // default config
    entry: './src/index.tsx',
    output: {
        path: resolve('dist'),
        filename: 'static/js/[name].[chunkhash:8].js',
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ], // to use without extension name
        alias: {
            '@': resolve('src'),
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
                use: [
                    // 开发环境使用 style-looader，生产环境抽离 css
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader', 'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'static/imgs/[name].[contenthash:8][ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                type: 'asset',
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]',
                },
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
            emitWarning: false,
            failOnWarning: false,
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 提取 node_modules 代码
                vendors: {
                    test: /node_modules/,
                    name: 'vendors',
                    minChunks: 1,
                    chunks: 'initial',
                    minSize: 0,
                    priority: 1,
                },
            },
        },
    },
}
