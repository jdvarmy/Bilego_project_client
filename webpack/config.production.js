const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// https://habr.com/ru/post/432368/#mobile
// https://habr.com/ru/post/325688/

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
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
  }
];

const serverConf = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: './webpack/server.js',
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: [/\.css$/, /\.scss$/],
        use: 'null-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public/css', to: 'css' },
      { from: 'public/scripts', to: 'scripts' },
      { from: 'public/images', to: 'images' },
      { from: 'public/files', to: 'files' },
    ])
  ],
  resolve: {
    alias: {
      '@material-ui/core': '@material-ui/core/es',
    },
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve('./app'),
    ],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
  }
};

const clientConf = options => ({
  mode: 'production',
  target: 'web',
  entry: ['@babel/polyfill', './app/browser/index.js'],
  output: {
    path: path.resolve('build'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].bilego.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      ...rules,
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
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/static/main.html',
      filename: 'main.html',
    }),
    new ExtractTextPlugin({ filename: '[name].[hash].css' }),

    // prod
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({ filename: '[hash:16].css' }),
    // new UglifyJSPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
});

module.exports = [clientConf, serverConf];

