'use strict';

var isNumeric = require('../util').isNumeric;

/**
 * Sanitizes a `column-number` value.
 *
 * @param  {*}          columnNumber    The raw `column-number` value.
 * @return {Integer}                    The sanitized `column-number` value.
 */
var sanitize = function (columnNumber) {
  var result = -1;

  if (isNumeric(columnNumber)) {
    result = parseInt(columnNumber, 10);
  }

  return result;
};

module.exports = {
  sanitize: sanitize
};
