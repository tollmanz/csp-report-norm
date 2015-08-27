'use strict';

var extractViolatedDirective = require('../extract/violatedDirective').extract;
var sanitizeViolatedDirective = require('../sanitize/violatedDirective').sanitize;

/**
 * Gets the `violated-directive` from a CSP report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               An `violated-directive` value.
 */
function get(payload) {
  var candidateViolatedDirective = extractViolatedDirective(payload);
  return sanitizeViolatedDirective(candidateViolatedDirective);
}

module.exports = {
  get: get
};
