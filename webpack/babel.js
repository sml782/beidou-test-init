'use strict'; // eslint-disable-line

/**
* 客户端使用到的babel配置项在此处配置，.babelrc 中的配置在服务端生效
*/
const babelrc = {
  presets: ['react', 'es2015', 'env'],
  babelrc: false, // 禁止客户端读取.babelrc文件
  plugins: [
    'transform-runtime',
    'add-module-exports',
    'transform-decorators-legacy',
    'transform-react-display-name',
    'transform-regenerator',
  ],
  env: {
    development: {
      plugins: [
        'typecheck',
        ['babel-plugin-react-transform', // 此处必须以babel-plugin开头,不能缩略,否则会报Unknown plugin "react-transform"
          {
            transforms: [{
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react'],
              locals: ['module'],
            },
            ],
          }],
      ],
    },
  },
};

module.exports = babelrc;
