'use strict';

const webpack = require('webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const path = require('path');
const globby = require('globby');

const alias = require('./alias');

const cwd = process.cwd();
const files = globby.sync(['**/pages/*'], { cwd: `${cwd}/client` });
const entry = {};

files.forEach((item) => {
  entry[item.replace(/^pages\//, '')] = ['babel-polyfill', path.join(__dirname, `../client/${item}/index.jsx`)];
});

exports.config = {
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
};

exports.plugin = [
  new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'script',
    include: 'all',
    fileBlacklist: [/\.(css|map)$/, /base?.+/],
  }),
  new webpack.ProgressPlugin((percentage, msg) => {
    const stream = process.stderr;
    if (stream.isTTY && percentage < 0.71) {
      stream.cursorTo(0);
      stream.write(`📦   ${msg}`);
      stream.clearLine(1);
    }
  }),
  new SWPrecacheWebpackPlugin({
    cacheId: 'beidou-test-init',
    filename: 'service-worker.js',
    staticFileGlobs: ['./build/*.{js,css,html}'],
    minify: true,
    stripPrefix: './build/',
  }),
];
