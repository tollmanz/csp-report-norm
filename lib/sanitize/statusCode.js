'use strict';

var validator = require('validator');

/**
 * Sanitizes a `status-code` value.
 *
 * @param  {String}    statusCode    The raw `status-code` value.
 * @return {String}                  The sanitized `status-code` value.
 */
function sanitize(statusCode) {
  return (parseInt(statusCode, 10) > -1) ? parseInt(statusCode, 10) : 0;
}

module.exports = {
  sanitize: sanitize
};
