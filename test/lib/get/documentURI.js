'use strict';

var assert = require('chai').assert;
var get = require('../../../lib/get/documentURI').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('document-uri is used when available', function() {
      var url = 'http://example.com';
      var payload = {
        'csp-report': {
          'document-uri': url
        }
      };

      assert.equal(get(payload), url);
    });

    test('empty string when csp-report is set and the document-uri is not set', function() {
      var payload = {
        'csp-report': ''
      };

      assert.equal(get(payload), '');
    });

    test('document-url is used when document-uri is not available', function() {
      var url = 'http://example.com';
      var payload = {
        'document-url': url
      };

      assert.equal(get(payload), url);
    });

    test('empty string is returned when neither document-uri or document-url are available', function() {
      var payload = {};

      assert.equal(get(payload), '');
    });
  });
});
