'use strict';

/**
 * Gets a `blocked-uri` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `blocked-uri` value.
 */
function extract(payload) {
  var blockedURI = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('blocked-uri')) {
    blockedURI = payload['csp-report']['blocked-uri'];
  }

  return blockedURI;
}

module.exports = {
  extract: extract
};
