'use strict';

/**
 * Gets a `document-url` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `document-url` value.
 */
function extract(payload) {
  var documentURL = '';

  if (payload.hasOwnProperty('document-url')) {
    documentURL = payload['document-url'];
  }

  return documentURL;
}

module.exports = {
  extract: extract
};
