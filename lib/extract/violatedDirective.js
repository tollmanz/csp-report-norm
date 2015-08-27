'use strict';

/**
 * Gets the `violated-directive` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `violated-directive` value.
 */
function extract(payload) {
  var violatedDirective = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('violated-directive')) {
    violatedDirective = payload['csp-report']['violated-directive'];
  }

  return violatedDirective;
}

module.exports = {
  extract: extract
};
