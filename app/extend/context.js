const _ = require('lodash');
const db = require('../db');

const symbol = Symbol('beidou#context#db');

module.exports = {
  get db() {
    if (!this[symbol]) {
      this[symbol] = db;
    }
    return this[symbol];
  },

  success(data, current, total) {
    this.body = {
      success: true,
      data,
      current,
      total,
    };
  },

  error(code, message, data) {
    if (_.isString(code)) {
      data = message;
      message = code;
    }

    this.body = {
      success: false,
      code,
      message,
      data,
    };
  },
};
