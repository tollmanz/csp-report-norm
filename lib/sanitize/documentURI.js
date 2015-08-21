'use strict';

var url = require('url');
var validator = require('validator');

/**
 * Sanitizes a `document-uri` or `document-url` value.
 *
 * @param  {String}    documentURI    The raw `document-uri` value.
 * @param  {String}    documentURL    The raw `document-url` value. This value
 *                                    is present in reports sent by older
 *                                    browsers. It will mostly be an empty
 *                                    string, but needs to be considered when a
 *                                    document-uri is not available.
 * @return {String}                   The sanitized `document-uri` value.
 */
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
