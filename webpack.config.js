const path = require('path');
const terserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        clean: {
            dry: true,
            keep: /\.css/
        }
    },
    mode: 'production',
    //if we only do webpack serve it serve the index hbs file 
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024
                    }
                }
            },
            {
                test: /\.txt/,
                type: 'asset/source'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            },
            // {
            //     test: /output\.js$/,
            //     use: 'ignore-loader'
            // }
        ],
    },
    resolve: {
        // alias: {
        //     [path.resolve(__dirname, "src/altText.txt")]:
        //         path.resolve(__dirname, "src/altText2.txt")
        // },
        // alias: {
        //     [path.resolve(__dirname, "src/output.js")]:
        //         path.resolve(__dirname, "src/output3.js")
        // }
    },
    plugins: [
        new terserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'my webpack project',
            template: 'src/index.hbs'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/output.js', to: "" },
            ],
        })
    ]
}