const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "index.web.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(react-native|@react-native|expo-camera|expo-modules-core)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow", "@babel/preset-typescript"],
            plugins: [
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-transform-runtime"
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      // Add specific module resolutions for react-native components
      'react-native/Libraries/EventEmitter/': 'react-native-web/dist/vendor/react-native/EventEmitter/',
      'react-native/Libraries/vendor/emitter/': 'react-native-web/dist/vendor/react-native/emitter/',
      'react-native/Libraries/Components/View/': 'react-native-web/dist/exports/View/',
      'react-native/Libraries/Image/': 'react-native-web/dist/exports/Image/',
      'react-native/Libraries/Text/': 'react-native-web/dist/exports/Text/',
      'react-native/Libraries/Utilities/': 'react-native-web/dist/modules/',
    },
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    host: "0.0.0.0",
    hot: true,
    allowedHosts: "all", // Allow all hosts
  },
};
