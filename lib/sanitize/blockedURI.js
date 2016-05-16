'use strict';

var isGloballyUniqueIdentifier = require('../util').isGloballyUniqueIdentifier;
var sanitizeGloballyUniqueIdentifier = require('../util').sanitizeGloballyUniqueIdentifier;
var url = require('url');
var validator = require('validator');

/**
 * Check for special blocked-uri values that are not URI and should be allowed.
 *
 * @param   {String}     blockedURI    The blocked-uri value to test.
 * @returns {boolean}                  Whether or not the value is allowed.
 */
function isSpecialCase(blockedURI) {
  var result = false;
  var specialCases = [
    'about',
    'about:blank',
    'android-webview',
    'android-webview-video-poster',
    'ms-appx-web://',
    'chrome-extension://',
    'safari-extension://',
    'mxjscall://',
    'webviewprogressproxy://',
    'res://',
    'mx://',
    'safari-resource://',
    'chromenull://',
    'chromeinvoke://',
    'chromeinvokeimmediate://',
    'mbinit://',
    'opera://',
    'localhost',
    '127.0.0.1',
    'none://'
  ];

  specialCases.forEach(function(specialCase) {
    if (specialCase.indexOf(blockedURI.trim()) === 0) {
      result = true;
    }
  });

  return result;
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
  } else if (isSpecialCase(blockedURI)) {
    result = blockedURI.trim();
  } else if (validator.isURL(blockedURI)) {
    blockedURIPieces = url.parse(blockedURI);

    // We may not actually have a protected resource passed to the function. In
    // that case, do not treat the value as a URL
    if (validator.isURL(protectedResource)) {
      protectedResourcePieces = url.parse(protectedResource);
    }

    // If the protected resource's origin is the same as that of the blocked URI
    // the whole URI can be returned; otherwise, the origin only is returned.
    if (protectedResourcePieces.host && blockedURIPieces.host === protectedResourcePieces.host) {
      result = blockedURI;
    } else {
      result = blockedURIPieces.protocol + '//' + blockedURIPieces.host;
    }
  }

  return result;
}

module.exports = {
  isSpecialCase: isSpecialCase,
  sanitize: sanitize
};
