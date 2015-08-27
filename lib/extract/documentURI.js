'use strict';

function extract(payload) {
  var documentURI = '';

  if (payload.hasOwnProperty('csp-report') && payload['csp-report'].hasOwnProperty('document-uri')) {
    documentURI = payload['csp-report']['document-uri'];
  }

  return documentURI;
}

module.exports = {
  extract: extract
};
