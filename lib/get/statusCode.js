'use strict';

var extractStatusCode = require('../extract/statusCode').extract;
var sanitizeStatusCode = require('../sanitize/statusCode').sanitize;

/**
 * Gets the `status-code` from a CSP report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               An `status-code` value.
 */
function get(payload) {
  var candidateStatusCode = extractStatusCode(payload);
  return sanitizeStatusCode(candidateStatusCode);
}

module.exports = {
  get: get
};
