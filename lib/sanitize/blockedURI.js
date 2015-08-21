'use strict';

var getGloballyUniqueIdentifiers = require('../util').getGloballyUniqueIdentifiers;
var isGloballyUniqueIdentifier = require('../util').isGloballyUniqueIdentifier;
var sanitizeGloballyUniqueIdentifier = require('../util').sanitizeGloballyUniqueIdentifier;
var url = require('url');
var validator = require('validator');

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
    if (blockedURIPieces.host === protectedResourcePieces.host && blockedURIPieces.protocol === protectedResourcePieces.protocol) {
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