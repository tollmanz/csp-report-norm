'use strict';

var url = require('url');
var validator = require('validator');

function sanitize(documentURI) {
  return (validator.isURL(documentURI)) ? documentURI : '';
}

module.exports = {
  sanitize: sanitize
}
