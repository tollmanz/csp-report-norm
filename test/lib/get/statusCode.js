'use strict';

var assert = require('chai').assert;
var get = require('../../../lib/get/statusCode').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('returns statusCode correctly when passed statusCode', function() {
      var statusCode = 200;
      var report = {
        'csp-report': {
          'status-code': statusCode
        }
      };

      assert.equal(get(report), statusCode);
    });

    test('returns empty string when directive is not proper', function() {
      var statusCode = 'blah http://example.com';
      var report = {
        'csp-report': {
          'status-code': statusCode
        }
      };

      assert.equal(get(report), '');
    });
  });
});
