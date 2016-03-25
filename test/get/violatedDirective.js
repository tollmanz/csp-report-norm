'use strict';

var assert = require('chai').assert;
var get = require('../../lib/get/violatedDirective').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('returns violated directive correctly when passed violated directive', function() {
      var violatedDirective = 'style-src http://example.com';
      var report = {
        'csp-report': {
          'violated-directive': violatedDirective
        }
      };

      assert.equal(get(report), violatedDirective);
    });

    test('returns empty string when directive is not proper', function() {
      var violatedDirective = 'blah http://example.com';
      var report = {
        'csp-report': {
          'violated-directive': violatedDirective
        }
      };

      assert.equal(get(report), '');
    });
  });
});
