'use strict'; // eslint-disable-line

// Webpack config for production
const extend = require('extend');
const webpack = require('webpack');
const config = require('./webpack.config.base.js');

module.exports = (app, defaultConfig) => {
  defaultConfig.plugins.splice(4, 1);
  const prodConfig = extend(true, {}, defaultConfig, {
    ...config,
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      ...defaultConfig.plugins,
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false,
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        __ENV__: JSON.stringify('production'),
        __DAILY___: false,
        __PROD__: true,
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.ProgressPlugin((percentage, msg) => {
        const stream = process.stderr;
        if (stream.isTTY && percentage < 0.71) {
          stream.cursorTo(0);
          stream.write(`📦   ${msg}`);
          stream.clearLine(1);
        }
      }),
    ],
  });

  // console.log(prodConfig);
  return prodConfig;
};
