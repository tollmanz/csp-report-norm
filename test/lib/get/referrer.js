'use strict';

var assert = require('chai').assert;
var get = require('../../../lib/get/referrer').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('returns referrer correctly when passed referrer', function() {
      var referrer = 'http://example.com';
      var report = {
        'csp-report': {
          'referrer': referrer
        }
      };

      assert.equal(get(report), referrer);
    });

    test('returns empty string when directive is not proper', function() {
      var referrer = 'blah http://example.com';
      var report = {
        'csp-report': {
          'referrer': referrer
        }
      };

      assert.equal(get(report), '');
    });
  });
});
