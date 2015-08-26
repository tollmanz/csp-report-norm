'use strict';

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
