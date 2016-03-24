'use strict';

var sanitizeDocumentURI = require('./documentURI');

/**
 * Sanitizes a `referrer` value.
 *
 * Currently, this is an alias for the documentURI sanitization function. This exists in order to decouple the two
 * should it ever be needed.
 *
 * @param  {String}    uri    The raw `referrer` value.
 * @return {String}           The sanitized `referrer` value.
 */
function sanitize(uri) {
  return sanitizeDocumentURI.sanitize(uri);
}

module.exports = {
  sanitize: sanitize
};
