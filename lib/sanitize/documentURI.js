'use strict';

var url = require('url');
var validator = require('validator');

function sanitize(documentURI, documentURL) {
  var documentURL = documentURL || '';
  var uri = '';

  if ('' !== documentURI) {
    uri = documentURI;
  } else if ('' !== documentURL) {
    uri = documentURL;
  }

  return ('' !== uri && validator.isURL(uri)) ? uri : '';
}

module.exports = {
  sanitize: sanitize
}
