'use strict';

/**
 * Sanitizes a `blocked-uri` value.
 *
 * @param  {String}    value      The raw `blocked-uri` value.
 * @param  {Object}    payload    The full CSP report object.
 * @return {String}               The sanitized `blocked-uri` value.
 */
function sanitize(value, payload) {
  var result = '';

  if (true === isGloballyUniqueIdentifier(value)) {
    result = sanitizeGloballyUniqueIdentifier(value);
  }

  return result;
}

/**
 * Determines if the value uses a globally unique identifier.
 *
 * @param  {String}    value    The raw `blocked-uri` value.
 * @return {String}             Boolean representing whether or not the value is
 *                              a globally unique identifier.
 */
function isGloballyUniqueIdentifier(value) {
  var globallyUniqueIdentifiers = getGloballyUniqueIdentifiers();
  var result = false;

  globallyUniqueIdentifiers.forEach(function(globallyUniqueIdentifier) {
    if (0 === value.indexOf(globallyUniqueIdentifier)) {
      result = true;
    }
  });

  return result;
}

/**
 * Sanitizes a globally unique identifier `blocked-uri` value.
 *
 * @param  {String}    value    The raw `blocked-uri` value.
 * @return {String}             Sanitized globally unique identifier.
 */
function sanitizeGloballyUniqueIdentifier(value) {
  var globallyUniqueIdentifiers = getGloballyUniqueIdentifiers();
  var cleanValue = '';

  globallyUniqueIdentifiers.forEach(function(globallyUniqueIdentifier) {
    if (0 === value.indexOf(globallyUniqueIdentifier)) {
      cleanValue = globallyUniqueIdentifier;
    }
  });

  return cleanValue;
}

/**
 * List of allowed globally unique identifiers.
 *
 * @return {String}    Sanitized globally unique identifier.
 */
function getGloballyUniqueIdentifiers() {
  return [
    'data',
    'filesystem',
    'blob'
  ];
}

module.exports = {
  sanitize: sanitize
};
