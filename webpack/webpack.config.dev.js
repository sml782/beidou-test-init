'use strict'; // eslint-disable-line

// Webpack config for development
const webpack = require('webpack');
const extend = require('extend');
const config = require('./webpack.config.base.js');

module.exports = (app, defaultConfig) => {
  defaultConfig.plugins.splice(4, 1);
  const devConfig = extend(true, {}, defaultConfig, {
    ...config,
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      ...defaultConfig.plugins,
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('development'),
        __DEV__: true,
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
        __DAILY___: true,
      }),
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

  // console.log(devConfig);
  return devConfig;
};
