'use strict';

var extractSourceFile = require('../extract/sourceFile').extract;
var sanitizeSourceFile = require('../sanitize/sourceFile').sanitize;

/**
 * Gets the `source-file` from a CSP report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @param  {Object}    headers    The headers for the request.
 * @return {String}               An `source-file` value.
 */
function get(payload, headers) {
  var candidateSourceFile = extractSourceFile(payload);

  // The protected resource is the resource that the CSP is applied to. This can be a lot of things, but typically will
  // refer to the main HTML for a webpage. Here, the assumption is made that the protected resource is the request
  // referer
  var protectedResource = (headers.hasOwnProperty('referer')) ? headers.referer : '';

  return sanitizeSourceFile(candidateSourceFile, protectedResource);
}

module.exports = {
  get: get
};
