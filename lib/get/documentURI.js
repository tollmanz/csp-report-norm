'use strict';

var extractDocumentURI = require('../extract/documentURI').extract;
var extractDocumentURL = require('../extract/documentURL').extract;
var sanitizeDocumentURI = require('../sanitize/documentURI').sanitize;

/**
 * Gets a `document-uri` from a CSP report payload.
 *
 * The `document-uri` property should be set on the `csp-report` object (i.e.,
 * payload['csp-report']['document-uri']); however, some older browsers will
 * send a `document-url` property on the payload object that contains the same
 * information as the `document-uri` property. This function extracts a
 * `document-uri` from the payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `document-uri` value.
 */
function get(payload) {
  var uri = '';

  var candidateDocumentURI = extractDocumentURI(payload);

  // Directive not found. Attempt to get it from the root of the payload.
  if (candidateDocumentURI === '') {
    candidateDocumentURI = extractDocumentURL(payload);
  }

  return sanitizeDocumentURI(candidateDocumentURI);
}

module.exports = {
  get: get
};
