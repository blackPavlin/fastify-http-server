module.exports = {
    plugins: {
        "postcss-preset-env" : {},
        "autoprefixer": {},
        "cssnano": {
            preset: "default",
            discardComments: {
                removeAll: true,
            },
        },
        "css-mqpacker": {},
    },
}
