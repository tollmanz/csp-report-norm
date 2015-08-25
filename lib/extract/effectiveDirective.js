'use strict';

var isValidEffectiveDirective = require('../util').isValidEffectiveDirective;

function getEffectiveDirectiveFromEffectiveDirective(payload) {
  var effectiveDirective = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('effective-directive') && isValidEffectiveDirective(payload['csp-report']['effective-directive'])) {
    effectiveDirective = payload['csp-report']['effective-directive'];
  }

  return effectiveDirective;
}

function getEffectiveDirectiveFromDocumentURL(payload) {
  var documentURL = '';

  if (payload.hasOwnProperty('document-url')) {
      documentURL = payload['document-url'];
  }

  return documentURL;
}

function getEffectiveDirective(payload) {
  var effectiveDirective = getEffectiveDirectiveFromEffectiveDirective(payload);
  var documentURL = getEffectiveDirectiveFromDocumentURL(payload);

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
  getEffectiveDirectiveFromEffectiveDirective: getEffectiveDirectiveFromEffectiveDirective,
  getEffectiveDirectiveFromDocumentURL: getEffectiveDirectiveFromDocumentURL,
  getEffectiveDirective: getEffectiveDirective,
  generateEffectiveDirectiveFromViolatedDirective: generateEffectiveDirectiveFromViolatedDirective
}
