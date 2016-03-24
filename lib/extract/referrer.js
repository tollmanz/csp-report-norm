'use strict';

/**
 * Gets the `referrer` from a CSP report payload.
 *
 * Note that the CSP spec uses the correct spelling of `referrer` instead of the common computer science misspelling of
 * `referer`. This is terribly confusing so this library will use `referrer` throughout in order to be consistent with
 * the CSP spec.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `referrer` value.
 */
function extract(payload) {
  var referrer = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('referrer')) {
    referrer = payload['csp-report']['referrer'];
  }

  // @todo: is there another way to get this for browsers that don't send this in the payload? (e.g., the header referer value?)

  return referrer;
}

module.exports = {
  extract: extract
};
