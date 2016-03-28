'use strict';

var assert = require('chai').assert;
var extract = require('../../../lib/extract/columnNumber').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('extract finds column-number when it exists', function() {
      var columnNumber = 'http://google.com';
      var report = {
        'csp-report': {
          'column-number': columnNumber
        }
      };

      assert.equal(extract(report), columnNumber);
    });

    test('extract finds column-number when it exists and is an empty string', function() {
      var columnNumber = '';
      var report = {
        'csp-report': {
          'column-number': columnNumber
        }
      };

      assert.equal(extract(report), columnNumber);
    });

    test('extract returns empty string when `column-number` is not set', function() {
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
