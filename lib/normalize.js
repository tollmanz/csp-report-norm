'use strict';

var getBlockedURI = require('./get/blockedURI').get;
var getDocumentURI = require('./get/documentURI').get;
var getEffectiveDirective = require('./get/effectiveDirective').get;
var getOriginalPolicy = require('./get/originalPolicy').get;
var getReferrer = require('./get/referrer').get;
var getStatusCode = require('./get/statusCode').get;
var getViolatedDirective = require('./get/violatedDirective').get;
var getSourceFile = require('./get/sourceFile').get;
var getColumnNumber = require('./get/columnNumber').get;
var getLineNumber = require('./get/lineNumber').get;

/**
 * Given a payload, this function normalizes the CSP report to a CSP 2.0 compliant spec.
 *
 * @param   {Object}    payload    The JSON representation of the report body.
 * @param   {Object}    headers    The JSON representation of the report headers.
 * @returns {Object}               The normalized CSP report.
 */
var normalize = function(payload, headers) {
  var report = {
    'csp-report': {
      'document-uri': getDocumentURI(payload),
      'referrer': getReferrer(payload),
      'violated-directive': getViolatedDirective(payload),
      'effective-directive': getEffectiveDirective(payload),
      'original-policy': getOriginalPolicy(payload),
      'blocked-uri': getBlockedURI(payload, headers),
      'status-code': getStatusCode(payload)
    }
  };

  // Only append the following keys if they exist since they are optional
  var sourceFile = getSourceFile(payload, headers);
  var lineNumber = getLineNumber(payload);
  var columnNumber = getColumnNumber(payload);

  if (sourceFile !== '') {
    report['csp-report']['source-file'] = sourceFile;
  }

  if (lineNumber !== -1) {
    report['csp-report']['line-number'] = lineNumber;
  }

  if (columnNumber !== -1) {
    report['csp-report']['column-number'] = columnNumber;
  }

  return report;
};

module.exports = {
  normalize: normalize
};