const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|app[/\\]+libs.*)/,
    use: {
      loader: 'babel-loader',
    },
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
];

module.exports = rules;
