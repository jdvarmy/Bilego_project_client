const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// https://habr.com/ru/post/432368/#mobile
// https://habr.com/ru/post/325688/

module.exports = {
  mode: "development",
  externals: [nodeExternals(), 'react-helmet'],
  entry: './webpack/server.js',
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: /(node_modules|app)/,
        use: ['css-loader?modules=false'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public/css', to: 'css' },
      { from: 'public/scripts', to: 'scripts' },
      { from: 'public/images', to: 'images' },
      // { from: 'public/static/**', to: '.' },
    ])
  ],
  resolve: {
    alias: {
      '@material-ui/core': '@material-ui/core/es',
    },
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
    ],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
};
