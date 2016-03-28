'use strict';

var extractColumnNumber = require('../extract/columnNumber').extract;
var sanitizeColumnNumber = require('../sanitize/columnNumber').sanitize;

/**
 * Gets the `column-number` from a CSP report.
 *
 * @param  {Object}     payload    The CSP report body.
 * @return {Integer}               An `column-number` value.
 */
function get(payload) {
  var candidateColumnNumber = extractColumnNumber(payload);
  return sanitizeColumnNumber(candidateColumnNumber);
}

module.exports = {
  get: get
};
