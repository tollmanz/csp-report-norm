'use strict';

var violatedDirective = require('./violatedDirective');

/**
 * Sanitizes a `original-policy` value.
 *
 * @param  {String}    originalPolicy    The raw `original-policy` value.
 * @return {String}                      The sanitized `original-policy` value.
 */
function sanitize(originalPolicy) {
  return violatedDirective.sanitize(originalPolicy);
}

module.exports = {
  sanitize: sanitize
};
