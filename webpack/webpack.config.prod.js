'use strict'; // eslint-disable-line

// Webpack config for production
// const extend = require('extend');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { config, plugin } = require('./webpack.config.base.js');

config.devtool = 'cheap-module-source-map';
plugin.push(
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
  new CleanWebpackPlugin(
    ['dist/main.*.js', 'dist/manifest.*.js'], // 匹配删除的文件
    {
      root: __dirname, // 根目录
      verbose: true, // 开启在控制台输出信息
      dry: false, // 启用删除文件
    }
  ),
);

exports.config = config;
exports.plugin = plugin;

// module.exports = (app, defaultConfig) => {
//   defaultConfig.plugins.splice(4, 1);
//   const prodConfig = extend(true, {}, defaultConfig, {
//     ...config,
//     devtool: 'cheap-module-source-map',
//     plugins: [
//       ...defaultConfig.plugins,
//       ...plugin,
//       new CleanWebpackPlugin(
//         ['dist/main.*.js', 'dist/manifest.*.js'], // 匹配删除的文件
//         {
//           root: __dirname, // 根目录
//           verbose: true, // 开启在控制台输出信息
//           dry: false, // 启用删除文件
//         }
//       ),
//       new webpack.DefinePlugin({
//         __CLIENT__: true,
//         __SERVER__: false,
//         __DEVELOPMENT__: false,
//         __DEVTOOLS__: false,
//         'process.env': {
//           NODE_ENV: JSON.stringify('production'),
//         },
//         __ENV__: JSON.stringify('production'),
//         __DAILY___: false,
//         __PROD__: true,
//       }),
//     ],
//   });

//   // console.log(prodConfig);
//   return prodConfig;
// };
