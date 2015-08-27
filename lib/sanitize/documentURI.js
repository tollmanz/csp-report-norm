'use strict';

var validator = require('validator');

/**
 * Sanitizes a `document-uri` value.
 *
 * @param  {String}    uri    The raw `document-uri` value.
 * @return {String}           The sanitized `document-uri` value.
 */
function sanitize(uri) {
  return ('' !== uri && validator.isURL(uri)) ? uri : '';
}

module.exports = {
  sanitize: sanitize
};
