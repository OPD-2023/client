const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ProvidePlugin } = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const NODE_MODULES_REGEXP = /node_modules/

const babelRule = (test, ...additionalPresets) => ({
    test,
    exclude: NODE_MODULES_REGEXP,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", ...additionalPresets]
            }
        }
    ]
})

const styleRule = (test, useCallback) => {
    let use = [
        "style-loader",
        {
            loader: "css-loader",
            options: {
                modules: {
                    localIdentName: "[folder]__[local]--[hash:base64:8]"
                }
            }
        }
    ]
    
    if (useCallback) {
        use = useCallback(use)
    }

    return {
        test,
        exclude: NODE_MODULES_REGEXP,
        use
    }
}

module.exports = {
    mode: "development",
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        alias: {
            "@components": "./components",
            "@models": "./models",
            "@business-logic": "./business-logic"
        }
    },
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
            babelRule(/\.tsx$/, "@babel/preset-react", "@babel/preset-typescript"),
            styleRule(/\.css$/),
            styleRule(/\.styl$/, use => [...use, "stylus-loader"]),
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                use: "file-loader"
            }
        ]
    },
    devServer: {
        port: 1337,
        hot: true
    },
    performance: false
}