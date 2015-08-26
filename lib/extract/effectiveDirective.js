'use strict';

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
