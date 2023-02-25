const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const babelRule = (test, ...additionalPresets) => ({
    test,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", ...additionalPresets]
            }
        }
    ]
})

module.exports = env => {
    const isDevelopment = env.NODE_ENV === "dev"

    return {
        mode: isDevelopment ? "development" : "production",
        entry: {
            index: ["@babel/polyfill", "./src/index.ts"]
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
        module: {
            rules: [
                babelRule(/\.ts$/, "@babel/preset-typescript")
            ]
        }
    }
}