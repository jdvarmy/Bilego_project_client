const path = require('path');

const alias = {
  components: path.resolve('./app/components'),
  pages: path.resolve('./app/pages'),
  services: path.resolve('./app/services'),
  stores: path.resolve('./app/stores'),
  theme: path.resolve('./app/theme'),
  '@material-ui/core': '@material-ui/core/es',
};

module.exports = alias;
