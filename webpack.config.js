const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ProvidePlugin } = require("webpack")
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

module.exports = {
    mode: "development",
    entry: {
        index:  ["@babel/polyfill", "./src/index.tsx"]
    },
    output: {
        filename: "[name]__[contenthash:8].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            minify: {
                collapseWhitespace: true
            },
        }),
        new ProvidePlugin({
            React: "react"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            babelRule(/\.js$/),
            babelRule(/\.jsx$/, "@babel/preset-react"),
            babelRule(/\.ts$/, "@babel/preset-typescript"),
            babelRule(/\.tsx$/, "@babel/preset-react", "@babel/preset-typescript")
        ]
    },
    devServer: {
        port: 1337
    }
}