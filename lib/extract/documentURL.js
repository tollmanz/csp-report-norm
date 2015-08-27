'use strict';

function extract(payload) {
  var documentURL = '';

  if (payload.hasOwnProperty('document-url')) {
    documentURL = payload['document-url'];
  }

  return documentURL;
}

module.exports = {
  extract: extract
};
