'use strict';

var extractOriginalPolicy = require('../extract/originalPolicy').extract;
var sanitizeOriginalPolicy = require('../sanitize/originalPolicy').sanitize;

/**
 * Gets the `original-policy` from a CSP report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               An `original-policy` value.
 */
function get(payload) {
  var candidateOriginalPolicy = extractOriginalPolicy(payload);
  return sanitizeOriginalPolicy(candidateOriginalPolicy);
}

module.exports = {
  get: get
};
