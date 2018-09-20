'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  // rest: {
  //   urlprefix: '/rest/api/',
  //   authRequest: null,
  //   authIgnores: null,
  // },
  router: {
    root: '/pages',
    entry: 'page',
  },
  middleware: [
    // 'jsonp',
    'gzip',
  ],
  gzip: {
    threshold: 1024, // 小于 1k 的响应体不压缩
  },
  react: {
    static: true,
    // middlewares: [
    //   'time',
    //   'cache',
    //   'redux',
    //   'partial',
    //   'render',
    //   'doctype',
    //   'beautify',
    // ],
  },
  security: {
    domainWhiteList: ['localhost:6001'],
  },
  session: {
    key: 'BEIDOU_SESS',
    maxAge: 1 * 3600 * 1000, // 1 hour
    httpOnly: true,
    encrypt: true,
  },
};
