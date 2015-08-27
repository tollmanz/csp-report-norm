'use strict';

/**
 * Sanitizes a `violated-directive` value.
 *
 * @param  {String}    violatedDirective    The raw `violated-directiv` value.
 * @return {String}                         The sanitized `violated-directive`
 *                                          value.
 */
function sanitize(violatedDirective) {
  return violatedDirective;
}

module.exports = {
  sanitize: sanitize
};
