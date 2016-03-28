'use strict';

/**
 * Gets the `line-number` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `line-number` value.
 */
function extract(payload) {
  var lineNumber = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('line-number')) {
    lineNumber = payload['csp-report']['line-number'];
  }

  return lineNumber;
}

module.exports = {
  extract: extract
};
