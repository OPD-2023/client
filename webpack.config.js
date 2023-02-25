const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = function(env) {
    const isDevelopment = env.NODE_ENV === "dev"

    return {
        mode: isDevelopment ? "development" : "production",
        entry: {
            index: "./src/index.js"
        },
        output: {
            filename: "[name]__[contenthash:8].bundle.js",
            path: path.resolve(__dirname, "dist")
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                minify: {
                    collapseWhitespace: !isDevelopment
                },
            }),
            new CleanWebpackPlugin()
        ],
    }
}