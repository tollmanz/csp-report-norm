'use strict';

/**
 * Gets the `effective-directive` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               An `effective-directive` value.
 */
function extract(payload) {
  var effectiveDirective = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('effective-directive')) {
    effectiveDirective = payload['csp-report']['effective-directive'];
  }

  return effectiveDirective;
}

module.exports = {
  extract: extract
};
