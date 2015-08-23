'use strict';

var assert = require('chai').assert;
var getDocumentURI = require('../../lib/extract/documentURI').getDocumentURI;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('getDocumentURI is a function', function() {
      assert.isFunction(getDocumentURI);
    });

    test('document-uri is used when available', function() {
      var url = 'http://example.com';
      var payload = {
        'csp-report': {
          'document-uri': url
        }
      };

      assert.equal(getDocumentURI(payload), url);
    });

    test('empty string when csp-report is set and the document-uri is not set', function() {
      var payload = {
        'csp-report': ''
      };

      assert.equal(getDocumentURI(payload), '');
    });

    test('document-url is used when document-uri is not available', function() {
      var url = 'http://example.com';
      var payload = {
        'document-url': url
      };

      assert.equal(getDocumentURI(payload), url);
    });

    test('empty string is returned when neither document-uri or document-url are available', function() {
      var payload = {};

      assert.equal(getDocumentURI(payload), '');
    });
  });
});
