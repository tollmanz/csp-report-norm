'use strict';

var assert = require('chai').assert;
var extract = require('../../lib/extract/originalPolicy').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('extract finds original policy when it exists', function() {
      var policy = 'default-src http://example.com; img-src \'self\'';
      var report = {
        'csp-report': {
          'original-policy': policy
        }
      };

      assert.equal(extract(report), policy);
    });

    test('extract returns empty string when `original-policy` is not set', function() {
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
