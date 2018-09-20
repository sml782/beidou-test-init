const jsonp = require('koa-safe-jsonp');

module.exports = (options, app) => {
  jsonp(app, {
    callback: 'callback', // default is 'callback'
    limit: 50, // max callback name string length, default is 512
  });
  return async function (ctx, next) {
    await next;
  };
};
