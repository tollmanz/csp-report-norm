'use strict';

/**
 * Gets the `status-code` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `status-code` value.
 */
function extract(payload) {
  var referrer = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('status-code')) {
    referrer = payload['csp-report']['status-code'];
  }

  return referrer;
}

module.exports = {
  extract: extract
};
