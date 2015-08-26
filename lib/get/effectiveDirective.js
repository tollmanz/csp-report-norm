'use strict';

var extractEffectiveDirective = require('../extract/effectiveDirective').extract;
var getViolatedDirective = require('../get/violatedDirective').get;
var isValidEffectiveDirective = require('../validate/effectiveDirective').validate;
var getDirectives = require('../util').getDirectives;

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
