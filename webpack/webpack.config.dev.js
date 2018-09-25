'use strict'; // eslint-disable-line

// Webpack config for development
const webpack = require('webpack');
const extend = require('extend');
const fs = require('fs');
const { config, plugin } = require('./webpack.config.base.js');

module.exports = (app, defaultConfig) => {
  // 删除 DefinePlugin
  defaultConfig.plugins.splice(4, 1);

  // 添加 webpack-dev-server 支持 service-worker
  defaultConfig.devServer.setup = function (dapp) {
    dapp.get('/service-worker.js', (req, res) => {
      res.set({ 'Content-Type': 'application/javascript; charset=utf-8' });
      res.send(fs.readFileSync('build/service-worker.js'));
    });
  };

  // 合并初始化webpack
  const devConfig = extend(true, {}, defaultConfig, {
    ...config,
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      ...defaultConfig.plugins,
      ...plugin,
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('development'),
        __DEV__: true,
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
        __DAILY___: true,
      }),
    ],
  });

  // console.log(devConfig.module.rules);
  return devConfig;
};
