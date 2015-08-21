'use strict';

var url = require('url');
var validator = require('validator');

function sanitize(statusCode) {
  return (validator.isNumeric(statusCode) && parseInt(statusCode, 10) > -1) ? parseInt(statusCode, 10) : 0;
}

module.exports = {
  sanitize: sanitize
}
