'use strict';

var assert = require('chai').assert;
var extract = require('../../lib/extract/statusCode').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('extract finds statusCode when it exists', function() {
      var statusCode = 200;
      var report = {
        'csp-report': {
          'status-code': statusCode
        }
      };

      assert.equal(extract(report), statusCode);
    });

    test('extract finds statusCode when it exists and is an empty string', function() {
      var statusCode = '';
      var report = {
        'csp-report': {
          'status-code': statusCode
        }
      };

      assert.equal(extract(report), statusCode);
    });

    test('extract returns empty string when `statusCode` is not set', function() {
      var report = {
        'csp-report': {}
      };

      assert.equal(extract(report), '');
    });

    test('extract returns empty string when `csp-report` is not set', function() {
      var report = {};
      assert.equal(extract(report), '');
    });
  });
});
