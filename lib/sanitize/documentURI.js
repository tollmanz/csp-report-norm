'use strict';

var url = require('url');
var validator = require('validator');

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
function getDocumentURI(payload) {
  var uri = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('document-uri')) {
    uri = payload['csp-report']['document-uri'];
  } else if (payload.hasOwnProperty('document-url')) {
    uri = payload['document-url'];
  }

  return uri;
}

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
  getDocumentURI: getDocumentURI,
  sanitize: sanitize
}
