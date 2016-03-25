'use strict';

var util = require('../util');

/**
 * Sanitizes a `violated-directive` value.
 *
 * @param  {String}    violatedDirective    The raw `violated-directive` value.
 * @return {String}                         The sanitized `violated-directive`
 *                                          value.
 */
function sanitize(violatedDirective) {
  var pieces = util.parseDirectiveString(violatedDirective);
  return pieces
    .map(function(item) {
      return item.directive + ' ' + item.value;
    })
    .join('; ');
}

module.exports = {
  sanitize: sanitize
};
