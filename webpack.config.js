const path = require("path");
const pkg = require("./package.json")
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./react_app/index.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname + '/build'),
        library: {
            name: 'components',
            type: 'umd',
            umdNamedDefine: true
        }
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.svg$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'svg-inline-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 3. Inject styles into DOM
                    "css-loader", // 2. Turns css into commonjs
                    "sass-loader", // 1. Turns sass into css
                ],
            },
            {
                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },

    /*
    *  devServer - работаем локально с React и сервером разработки Webpack (на порту 8090),
    *  React использует свой собственный сервер разработки для обслуживания своих файлов и не имеет доступа к объектам Spring Boot,
    *  таким как ${message}.
    *  (смотри index.html)
    * */

    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'build'),
        },
        port: 8090,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        },
        hot: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('../resources/templates/index.html'), // путь до вашего html файла, который используется в качестве шаблона
        }),
    ],

};