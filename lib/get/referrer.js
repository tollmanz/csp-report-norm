'use strict';

var extractReferrer = require('../extract/referrer').extract;
var sanitizeReferrer = require('../sanitize/referrer').sanitize;

/**
 * Gets the `referrer` from a CSP report.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `referrer` value.
 */
function get(payload) {
  var candidateReferrer = extractReferrer(payload);
  return sanitizeReferrer(candidateReferrer);
}

module.exports = {
  get: get
};
