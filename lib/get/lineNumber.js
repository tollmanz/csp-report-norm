'use strict';

var extractLineNumber = require('../extract/lineNumber').extract;
var sanitizeLineNumber = require('../sanitize/lineNumber').sanitize;

/**
 * Gets the `line-number` from a CSP report.
 *
 * @param  {Object}     payload    The CSP report body.
 * @return {Integer}               An `line-number` value.
 */
function get(payload) {
  var candidateLineNumber = extractLineNumber(payload);
  return sanitizeLineNumber(candidateLineNumber);
}

module.exports = {
  get: get
};
