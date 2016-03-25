'use strict';

/**
 * Gets the `original-policy` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `original-policy` value.
 */
function extract(payload) {
  var originalDirective = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('original-policy')) {
    originalDirective = payload['csp-report']['original-policy'];
  }

  return originalDirective;
}

module.exports = {
  extract: extract
};
