'use strict';

/**
 * Gets a `document-uri` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `document-uri` value.
 */
function extract(payload) {
  var documentURI = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('document-uri')) {
    documentURI = payload['csp-report']['document-uri'];
  }

  return documentURI;
}

module.exports = {
  extract: extract
};
