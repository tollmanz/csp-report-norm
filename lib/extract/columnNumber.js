'use strict';

/**
 * Gets the `column-number` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `column-number` value.
 */
function extract(payload) {
  var columnNumber = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('column-number')) {
    columnNumber = payload['csp-report']['column-number'];
  }

  return columnNumber;
}

module.exports = {
  extract: extract
};
