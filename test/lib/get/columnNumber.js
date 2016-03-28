'use strict';

var assert = require('chai').assert;
var get = require('../../../lib/get/columnNumber').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('returns column-number correctly when passed column-number', function() {
      var columnNumber = 23;
      var report = {
        'csp-report': {
          'column-number': columnNumber
        }
      };

      assert.strictEqual(get(report), columnNumber);
    });

    test('returns -1 when column number is not a number', function() {
      var columnNumber = 'blah';
      var report = {
        'csp-report': {
          'column-number': columnNumber
        }
      };

      assert.strictEqual(get(report), -1);
    });
  });
});
