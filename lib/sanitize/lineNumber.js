'use strict';

var isNumeric = require('../util').isNumeric;

/**
 * Sanitizes a `line-number` value.
 *
 * @param  {*}          lineNumber    The raw `line-number` value.
 * @return {Integer}                  The sanitized `line-number` value.
 */
var sanitize = function (lineNumber) {
  var result = -1;

  if (isNumeric(lineNumber)) {
    result = parseInt(lineNumber, 10);
  }

  return result;
};

module.exports = {
  sanitize: sanitize
};
