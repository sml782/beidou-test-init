'use strict';

const webpack = require('webpack');
const path = require('path');
const globby = require('globby');
const alias = require('./alias');

const cwd = process.cwd();
const files = globby.sync(['**/pages/*'], { cwd: `${cwd}/client` });
const entry = {};

files.forEach((item) => {
  entry[item.replace(/^pages\//, '')] = [path.join(__dirname, `../client/${item}/index.jsx`)];
});

module.exports = {
  entry,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    antd: true,
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias,
  },
  // plugin: [
  //   new webpack.ProgressPlugin((percentage, msg) => {
  //     const stream = process.stderr;
  //     if (stream.isTTY && percentage < 0.71) {
  //       stream.cursorTo(0);
  //       stream.write(`📦   ${msg}`);
  //       stream.clearLine(1);
  //     }
  //   }),
  // ],
};
