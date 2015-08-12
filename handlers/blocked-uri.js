'use strict';

var url = require('url');
var validator = require('validator');

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
 * Sanitizes a `blocked-uri` value.
 *
 * @param  {String}    blockedURI           The raw `blocked-uri` value.
 * @param  {String}    protectedResource    The URI of the resource protected
 *                                          by the CSP policy.
 * @return {String}                         The sanitized `blocked-uri` value.
 */
function sanitize(blockedURI, protectedResource) {
  var result = '';
  var blockedURIPieces = {};
  var protectedResourcePieces = {};

  if (true === isGloballyUniqueIdentifier(blockedURI)) {
    result = sanitizeGloballyUniqueIdentifier(blockedURI);
  } else if (validator.isURL(blockedURI)) {
    blockedURIPieces = url.parse(blockedURI);
    protectedResourcePieces = url.parse(protectedResource);

    // If the protected resource's origin is the same as that of the blocked URI
    // the whole URI can be returned; otherwise, the origin only is returned.
    if (blockedURIPieces.host === protectedResourcePieces.host) {
      result = blockedURI;
    } else {
      result = blockedURIPieces.protocol + '//' + blockedURIPieces.host + '/';
    }
  }

  return result;
}

module.exports = {
  sanitize: sanitize
};
