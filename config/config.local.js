'use strict';

const path = require('path');

module.exports = {
  webpack: {
    custom: {
      configPath: path.join(__dirname, '../webpack/webpack.config.js'),
    },
  },
  react: {},
};
