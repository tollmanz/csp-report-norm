'use strict';

var assert = require('chai').assert;
var get = require('../../../lib/get/lineNumber').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('returns line-number correctly when passed line-number', function() {
      var lineNumber = 23;
      var report = {
        'csp-report': {
          'line-number': lineNumber
        }
      };

      assert.strictEqual(get(report), lineNumber);
    });

    test('returns -1 when column number is not a number', function() {
      var lineNumber = 'blah';
      var report = {
        'csp-report': {
          'line-number': lineNumber
        }
      };

      assert.strictEqual(get(report), -1);
    });
  });
});
