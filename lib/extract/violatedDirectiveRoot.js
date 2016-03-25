'use strict';

/**
 * Gets the `violated-directive` from a CSP report payload when the directive is not namespaced by `csp-report`.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `violated-directive` value.
 */
function extract(payload) {
  var violatedDirective = '';

  if (payload.hasOwnProperty('violated-directive')) {
    violatedDirective = payload['violated-directive'];
  }

  return violatedDirective;
}

module.exports = {
  extract: extract
};
