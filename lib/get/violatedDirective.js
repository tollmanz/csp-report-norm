'use strict';

var extractViolatedDirective = require('../extract/violatedDirective').extract;
var sanitizeViolatedDirective = require('../sanitize/violatedDirective').sanitize;

function get(payload) {
  var candidateViolatedDirective = extractViolatedDirective(payload);
  return sanitizeViolatedDirective(candidateViolatedDirective);
}

module.exports = {
  get: get
};
