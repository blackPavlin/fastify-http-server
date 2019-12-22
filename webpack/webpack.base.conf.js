const path = require("path")
const entry = require("./entry")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")

const PATHS = {
    src: path.join(__dirname, "../client"),
    build: path.join(__dirname, "../public"),
};

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry,
    output: {
        filename: "js/[name].[hash].js",
        path: PATHS.build,
        publicPath: "/",
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: "/(node_modules|bower_components)/",
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true },
                }, {
                    loader: "postcss-loader",
                    options: { sourceMap: true },
                }
            ]
        }, {
            test: /\.(scss|sass)$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true },
                }, {
                    loader: "sass-loader",
                    options: { sourceMap: true },
                }, {
                    loader: "postcss-loader",
                    options: { sourceMap: true },
                }
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader",
            options: {
                limit: 2048,
                name: "assets/images/[name].[ext]",
            },
        }, {
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                loader: {
                    scss: "vue-style-loader!css-loader!sass-loader",
                },
            },
        }, {
            test: /.(woff|woff2|eot|ttf|svg)$/,
            loader: "file-loader",
            options: {
                name: "assets/images/[name].[ext]",
            },
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[hash].css",
            // chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/assets/images`, to: `${PATHS.build}/assets/images` },
            { from: `${PATHS.src}/assets/fonts`, to: `${PATHS.build}/assets/fonts` },
            { from: `${PATHS.src}/static`, to: ""},
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/pages/main/index.html`,
            filename: `./index.html`,
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            "~": "src",
            "vue$": "vue/dist/vue.js",
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "commons",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true,
                }
            },
        },
    },
}
