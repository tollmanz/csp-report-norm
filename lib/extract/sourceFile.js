'use strict';

/**
 * Gets the `source-file` from a CSP report payload.
 *
 * @param  {Object}    payload    The CSP report body.
 * @return {String}               A `source-file` value.
 */
function extract(payload) {
  var sourceFile = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('source-file')) {
    sourceFile = payload['csp-report']['source-file'];
  }

  return sourceFile;
}

module.exports = {
  extract: extract
};
