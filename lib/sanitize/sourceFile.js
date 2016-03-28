'use strict';

var isGloballyUniqueIdentifier = require('../util').isGloballyUniqueIdentifier;
var sanitizeGloballyUniqueIdentifier = require('../util').sanitizeGloballyUniqueIdentifier;
var url = require('url');
var validator = require('validator');

/**
 * Sanitizes a `source-file` value.
 *
 * @param  {String}    sourceFile           The raw `source-file` value.
 * @param  {String}    protectedResource    The URI of the resource protected
 *                                          by the CSP policy.
 * @return {String}                         The sanitized `source-file` value.
 */
function sanitize(sourceFile, protectedResource) {
  var result = '';
  var sourceFilePieces = {};
  var protectedResourcePieces = {};

  if (true === isGloballyUniqueIdentifier(sourceFile)) {
    result = sanitizeGloballyUniqueIdentifier(sourceFile);
  } else if (validator.isURL(sourceFile)) {
    sourceFilePieces = url.parse(sourceFile);

    // We may not actually have a protected resource passed to the function. In
    // that case, do not treat the value as a URL
    if (validator.isURL(protectedResource)) {
      protectedResourcePieces = url.parse(protectedResource);
    }

    // If the protected resource's origin is the same as that of the blocked URI
    // the whole URI can be returned; otherwise, the origin only is returned.
    if (protectedResourcePieces.host && protectedResourcePieces.protocol && sourceFilePieces.host === protectedResourcePieces.host && sourceFilePieces.protocol === protectedResourcePieces.protocol) {
      result = sourceFile;
    } else {
      result = sourceFilePieces.protocol + '//' + sourceFilePieces.host;
    }
  }

  return result;
}

module.exports = {
  sanitize: sanitize
};
