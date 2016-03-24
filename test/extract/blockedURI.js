'use strict';

var assert = require('chai').assert;
var extract = require('../../lib/extract/blockedURI').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('blocked-uri is used when available', function() {
      var url = 'http://example.com';
      var payload = {
        'csp-report': {
          'blocked-uri': url
        }
      };

      assert.equal(extract(payload), url);
    });

    test('empty string when csp-report is set and the blocked-uri is not set', function() {
      var payload = {
        'csp-report': ''
      };

      assert.equal(extract(payload), '');
    });

    test('empty string is returned when payload is empty', function() {
      var payload = {};

      assert.equal(extract(payload), '');
    });
  });
});
