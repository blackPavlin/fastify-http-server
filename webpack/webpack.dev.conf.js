const webpack = require("webpack")
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "#@cheap-module-eval-source-map",
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.build,
        port: 3001,
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: 5000,
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({ filename: "[file].map" })
    ]
})

module.exports = Promise.resolve(devWebpackConfig)
