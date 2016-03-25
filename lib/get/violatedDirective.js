'use strict';

var extractViolatedDirective = require('../extract/violatedDirective').extract;
var extractViolatedDirectiveRoot = require('../extract/violatedDirectiveRoot').extract;
var sanitizeViolatedDirective = require('../sanitize/violatedDirective').sanitize;

/**
 * Gets the `violated-directive` from a CSP report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               An `violated-directive` value.
 */
function get(payload) {
  var candidateViolatedDirective = extractViolatedDirective(payload);

  // Directive not found. Attempt to get it from the root of the payload.
  if (candidateViolatedDirective === '') {
    candidateViolatedDirective = extractViolatedDirectiveRoot(payload);
  }

  return sanitizeViolatedDirective(candidateViolatedDirective);
}

module.exports = {
  get: get
};