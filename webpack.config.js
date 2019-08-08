module.exports = {
    entry: {
        index: "./src/index.js",
        about: "./src/about.js"
    },
    output: {
        path: __dirname + "/public",
        filename: "js/[name].min.js"
    },
    devServer: {
        contentBase: __dirname + "/public"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};