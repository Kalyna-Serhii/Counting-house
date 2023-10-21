const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);
const config = {
  context: path.join(__dirname, './src'),
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      filename: 'index.html',
      template: './pages/index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Page registration',
      filename: 'registration.html',
      template: './pages/registration.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Page login',
      filename: 'login.html',
      template: './pages/login.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Page users',
      filename: 'users.html',
      template: './pages/users.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(html)$/i,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    static: path.resolve(__dirname, 'src'),
    hot: true,
    host: 'localhost',
    port: 8080,
  },
};

module.exports = config;
