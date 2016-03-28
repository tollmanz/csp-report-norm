'use strict';

/**
 * List of allowed globally unique identifiers.
 *
 * @return {Array}    Allowed globally unique identifiers.
 */
function getGloballyUniqueIdentifiers() {
  return [
    'data',
    'filesystem',
    'blob'
  ];
}

/**
 * Determines if the value uses a globally unique identifier.
 *
 * @param  {String}    value    A string to test.
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
 * @param  {String}    value    The URI to sanitize.
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
 * List of possible CSP directives.
 *
 * @return {Array}    CSP directives.
 */
function getDirectives() {
  return [
    'base-uri',
    'child-src',
    'connect-src',
    'default-src',
    'font-src',
    'form-action',
    'frame-ancestors',
    'frame-src',
    'img-src',
    'media-src',
    'object-src',
    'plugin-types',
    'report-uri',
    'script-src',
    'sandbox',
    'style-src'
  ];
}

/**
 * Determine if the effective-directive is valid.
 *
 * @param  {String}    effectiveDirective    The directive to test.
 * @return {Boolean}                         Whether or not the directive is
 *                                           valid.
 */
function isEffectiveDirective(effectiveDirective) {
  var directives = getDirectives();
  var result = false;

  directives.forEach(function(directive) {
    if (directive === effectiveDirective) {
      result = true;
    }
  });

  return result;
}

/**
 * Parses a policy or directive string into component pieces.
 *
 * @param   {String}    directiveString    The string to parse.
 * @returns {Array}                        An array of component pieces.
 */
function parseDirectiveString(directiveString) {
  var directives = [];
  var index = 0;
  var directive = '';
  var value = '';
  var pieces = (directiveString.indexOf(';') > -1) ? directiveString.split(';') : [directiveString];

  // Trim whitespace
  pieces = pieces.map(function(item) {
    return item.trim();
  });

  pieces.forEach(function(item) {
    // Note that a directive can have many white spaces; however, the first one breaks the directive name from the
    // directive value. The following splits on the first space, with the first group being the directive and the second
    // group being the directive value
    index = item.indexOf(' ');
    directive = item.substr(0, index).replace(/^\s+/, '');
    value = item.substr(index + 1).replace(/^\s+/, '');

    if (isEffectiveDirective(directive)) {
      directives.push({
        'directive': directive,
        'value': value
      });
    }
  });

  return directives;
}

/**
 * Determines if a value is numeric.
 *
 * @param   {*}          value    The value to test.
 * @returns {boolean}             Whether or not the value is numeric.
 */
var isNumeric = function(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

module.exports = {
  getGloballyUniqueIdentifiers: getGloballyUniqueIdentifiers,
  isGloballyUniqueIdentifier: isGloballyUniqueIdentifier,
  sanitizeGloballyUniqueIdentifier: sanitizeGloballyUniqueIdentifier,
  getDirectives: getDirectives,
  isEffectiveDirective: isEffectiveDirective,
  parseDirectiveString: parseDirectiveString,
  isNumeric: isNumeric
};
