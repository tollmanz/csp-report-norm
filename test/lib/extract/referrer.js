'use strict';

var assert = require('chai').assert;
var extract = require('../../../lib/extract/referrer').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('extract finds referrer when it exists', function() {
      var referrer = 'http://google.com';
      var report = {
        'csp-report': {
          'referrer': referrer
        }
      };

      assert.equal(extract(report), referrer);
    });

    test('extract finds referrer when it exists and is an empty string', function() {
      var referrer = '';
      var report = {
        'csp-report': {
          'referrer': referrer
        }
      };

      assert.equal(extract(report), referrer);
    });

    test('extract returns empty string when `referrer` is not set', function() {
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
