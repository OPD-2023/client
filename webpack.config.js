const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ProvidePlugin } = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const NODE_MODULES_REGEXP = /node_modules/

const babelRule = (test, ...additionalPresets) => ({
    test,
    exclude: NODE_MODULES_REGEXP,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", ...additionalPresets],
                plugins: [
                    ["@babel/plugin-proposal-decorators", { legacy: true }],
                    "babel-plugin-transform-typescript-metadata"
                ]
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
                    localIdentName: "[local]--[hash:base64:8]"
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
        /**
         *
         * Пути обязательно должны быть абсолютными
         * TODO: вынести в функцию
         */
        alias: {
            "@components": path.resolve(__dirname, "src", "components"),
            "@models": path.resolve(__dirname, "src", "models"),
            "@business-logic": path.resolve(__dirname, "src", "business-logic"),
            "@api": path.resolve(__dirname, "src", "api"),
            "@utils": path.resolve(__dirname, "src", "utils"),
            "@services": path.resolve(__dirname, "src", "services"),
            "@inversify-config": path.resolve(__dirname, "inversify.config.ts"),
            "@app-config": path.resolve(__dirname, "app.config.json"),
            "@l10n-packages": path.resolve(__dirname, "l10n.packages.json")
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
            template: path.resolve(__dirname, "public", "index.html"),
            minify: {
                collapseWhitespace: true
            },
        }),
        new ProvidePlugin({
            React: "react",
            _: "lodash"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public", "assets"),
                    /** Чтобы, когда копировать нечего, сборка не орала */
                    noErrorOnMissing: true
                }
            ]
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
            styleRule(/\.styl$/, use => [
                ...use,
                {
                    loader: "stylus-loader",
                    options: {
                        stylusOptions: {
                            /** Аналогично: пути должны быть абсолютными */
                            paths: [path.resolve(__dirname, "src", "styles")]
                        }
                    }
                }
            ]),
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