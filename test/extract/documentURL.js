'use strict';

var assert = require('chai').assert;
var extract = require('../../lib/extract/documentURL').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('document-url is used when available', function() {
      var url = 'http://example.com';
      var payload = {
        'document-url': url
      };

      assert.equal(extract(payload), url);
    });

    test('empty string when document-url is not set', function() {
      var payload = {};
      assert.equal(extract(payload), '');
    });
  });
});
