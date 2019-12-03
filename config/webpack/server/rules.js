const autoprefixer = require('autoprefixer');

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
    test: /\.(gif)$/,
    use: 'file-loader',
  },
  {
    test: /\.(jpe?g|png|ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
    use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
  },
  {
    test: /\.html$/,
    use: 'html-loader',
  },
  {
    test: /\.(mp4|webm|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: true,
      },
    },
  },
];

module.exports = rules;
