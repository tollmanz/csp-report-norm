'use strict';

var assert = require('chai').assert;
var extract = require('../../../lib/extract/lineNumber').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('extract finds line-number when it exists', function() {
      var lineNumber = 'http://google.com';
      var report = {
        'csp-report': {
          'line-number': lineNumber
        }
      };

      assert.equal(extract(report), lineNumber);
    });

    test('extract finds line-number when it exists and is an empty string', function() {
      var lineNumber = '';
      var report = {
        'csp-report': {
          'line-number': lineNumber
        }
      };

      assert.equal(extract(report), lineNumber);
    });

    test('extract returns empty string when `line-number` is not set', function() {
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
