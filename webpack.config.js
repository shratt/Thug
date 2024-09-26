const path = require('path');

module.exports = {
  mode: 'production',
  entry: './Thug/index.js',
  output: {
    path: path.resolve(__dirname, 'Build'),
    filename: 'Thug.min.js',
  },
};