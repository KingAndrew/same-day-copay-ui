import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.web.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|wav)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native/Libraries/EventEmitter/': 'react-native-web/dist/vendor/react-native/EventEmitter/',
      'react-native/Libraries/vendor/emitter/': 'react-native-web/dist/vendor/react-native/emitter/',
      'react-native/Libraries/Components/View/': 'react-native-web/dist/exports/View/',
      'react-native/Libraries/Image/': 'react-native-web/dist/exports/Image/',
      'react-native/Libraries/Text/': 'react-native-web/dist/exports/Text/',
      'react-native/Libraries/Utilities/': 'react-native-web/dist/modules/',
      // Disable Expo dependencies causing problems
      'expo-camera': path.resolve(__dirname, 'src/components/CameraMock.js'),
      'expo-modules-core': path.resolve(__dirname, 'src/components/CameraMock.js'),
    },
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
    fallback: {
      'path': false,
      'fs': false,
    }
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