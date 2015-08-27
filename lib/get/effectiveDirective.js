'use strict';

var extractEffectiveDirective = require('../extract/effectiveDirective').extract;
var getViolatedDirective = require('../get/violatedDirective').get;
var isValidEffectiveDirective = require('../validate/effectiveDirective').validate;
var getDirectives = require('../util').getDirectives;

/**
 * Gets the `effective-directive` for a CSP report.
 *
 * Attempts to extract the `effective-directive` from the report and if not
 * found, derives it from the `violated-directive` value for the report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               An `effective-directive` value.
 */
function get(payload) {
  var effectiveDirective = '';
  var candidateEffectiveDirective = extractEffectiveDirective(payload);
  var violatedDirective = getViolatedDirective(payload);

  if (isValidEffectiveDirective(candidateEffectiveDirective)) {
    effectiveDirective = candidateEffectiveDirective;
  } else if ('' !== violatedDirective) {
    effectiveDirective = generateEffectiveDirectiveFromViolatedDirective(violatedDirective);
  }

  return effectiveDirective;
}

/**
 * Derives an `effective-directive` from a `violated-directive`.
 *
 * @param  {String}    violatedDirective    The `violated-directive` value.
 * @return {String}                         An `effective-directive` value.
 */
function generateEffectiveDirectiveFromViolatedDirective(violatedDirective) {
  var effectiveDirective = '';
  var directives = getDirectives();

  // Attempt to match find an effective-directive that begins the violated
  // directive
  directives.forEach(function(value) {
    if (0 === violatedDirective.indexOf(value)) {
      effectiveDirective = value;
    }
  });

  return effectiveDirective;
}

module.exports = {
  get: get
};
