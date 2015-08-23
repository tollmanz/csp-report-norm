'use strict';

var assert = require('chai').assert;
var getDocumentURI = require('../../lib/extract/documentURI').getDocumentURI;

suite('extract', function() {
  suite('document-uri', function() {
    test('getDocumentURI is a function', function() {
      assert.isFunction(getDocumentURI);
    });

    test('document-url is used when document-uri is not available and document-url is and a valid URL is returned when passed', function() {
      var url = 'http://example.com';
      var payload = {
        'document-url': url
      };

      assert.equal(getDocumentURI(payload), url);
    });
  });
});
