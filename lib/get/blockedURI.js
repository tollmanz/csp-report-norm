'use strict';

var extractBlockedURI = require('../extract/blockedURI').extract;
var sanitizeBlockedURI = require('../sanitize/blockedURI').sanitize;

/**
 * Gets the `violated-directive` from a CSP report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @param  {Object}    headers    The headers for the request.
 * @return {String}               An `violated-directive` value.
 */
function get(payload, headers) {
  var candidateBlockedURI = extractBlockedURI(payload);

  // The protected resource is the resource that the CSP is applied to. This can be a lot of things, but typically will
  // refer to the main HTML for a webpage. Here, the assumption is made that the protected resource is the request
  // referer
  var protectedResource = (headers.hasOwnProperty('referer')) ? headers.referer : '';

  return sanitizeBlockedURI(candidateBlockedURI, protectedResource);
}

module.exports = {
  get: get
};
