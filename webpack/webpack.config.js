'use strict'; // eslint-disable-line

// const webpack = require('webpack');
const extend = require('extend');
const fs = require('fs');

// const babelConfig = require.resolve('./babel');
// const bei = require('babel-preset-beidou-client');

module.exports = (app, defaultConfig) => {
  const env = app.config.env === 'local' ? 'dev' : 'prod';
  const { config, plugin } = require(`./webpack.config.${env}`);
  // console.log(babelConfig);
  // bei.plugins = ['syntax-dynamic-import'];
  // const jsMoudle = defaultConfig.module.rules.find(item => /js/.test(item.test.source));
  // jsMoudle.use.options.presets = [babelConfig];
  // jsMoudle.use = [
  //   {
  //     loader: 'bundle-loader',
  //     options: {
  //       lazy: true,
  //       // name: '[name].[chunkhash:8]',
  //     },
  //   },
  //   jsMoudle.use,
  // ];
  // console.log(jsMoudle);

  // 删除 DefinePlugin
  defaultConfig.plugins.splice(4, 1);

  // 添加 webpack-dev-server 支持 service-worker
  if (app.config.env === 'local') {
    defaultConfig.devServer.before = function (dapp) {
      dapp.get('/service-worker.js', (req, res) => {
        res.set({ 'Content-Type': 'application/javascript; charset=utf-8' });
        res.send(fs.readFileSync('build/service-worker.js'));
      });
    };
  }

  // 合并初始化webpack
  const devConfig = extend(true, {}, defaultConfig, {
    ...config,
    plugins: [
      ...defaultConfig.plugins,
      ...plugin,
    ],
  });

  console.log(devConfig.output);
  return devConfig;
};
