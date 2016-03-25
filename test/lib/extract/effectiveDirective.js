'use strict';

var assert = require('chai').assert;
var extract = require('../../../lib/extract/effectiveDirective').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('extract finds directive when it exists', function() {
      var effectiveDirective = 'img-src';
      var report = {
        'csp-report': {
          'effective-directive': effectiveDirective
        }
      };

      assert.equal(extract(report), effectiveDirective);
    });

    test('extract returns empty string when `effective-directive` is not set', function() {
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
