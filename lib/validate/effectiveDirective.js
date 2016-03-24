'use strict';

var getDirectives = require('../util').getDirectives;

/**
 * Determine if the effective-directive is valid.
 *
 * @param  {String}    effectiveDirective    The directive to test.
 * @return {Boolean}                         Whether or not the directive is
 *                                           valid.
 */
function validate(effectiveDirective) {
  var directives = getDirectives();
  var result = false;

  directives.forEach(function(directive) {
    if (directive === effectiveDirective) {
      result = true;
    }
  });

  return result;
}

module.exports = {
  validate: validate
};
