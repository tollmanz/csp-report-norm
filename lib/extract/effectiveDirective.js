'use strict';

var isValidEffectiveDirective = require('../util').isValidEffectiveDirective;
var getEffectiveDirectiveFromEffectiveDirective = require('../util').getEffectiveDirectiveFromEffectiveDirective;

function getEffectiveDirective(payload) {
  var effectiveDirective = '';
  var candidateEffectiveDirective = getEffectiveDirectiveFromEffectiveDirective(payload);

  if ('' === candidateEffectiveDirective) {

  } else {

  }

  return effectiveDirective;
}

function generateEffectiveDirectiveFromViolatedDirective(violatedDirective) {
  var effectiveDirective = '';
  var effectiveDirectives = getEffectiveDirectives();

  // Attempt to match find an effective-directive that begins the violated
  // directive
  effectiveDirectives.forEach(function(value) {
    if (0 === violatedDirective.indexOf(value)) {
      effectiveDirective = value;
    }
  });

  return effectiveDirective;
}

module.exports = {
  getEffectiveDirective: getEffectiveDirective,
  generateEffectiveDirectiveFromViolatedDirective: generateEffectiveDirectiveFromViolatedDirective
}
