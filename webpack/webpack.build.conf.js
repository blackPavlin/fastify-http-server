const merge = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const baseWebpackConfig = require("./webpack.base.conf")

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        mergeDuplicateChunks: true,
    },
})

module.exports = Promise.resolve(buildWebpackConfig)
