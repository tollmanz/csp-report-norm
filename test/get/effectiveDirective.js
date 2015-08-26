'use strict';

var assert = require('chai').assert;
var get = require('../../lib/get/effectiveDirective').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('returns effective directive correctly when passed effective directive', function() {
      var effectiveDirective = 'style-src';
      var report = {
        'csp-report': {
          'effective-directive': effectiveDirective
        }
      };

      assert.equal(get(report), effectiveDirective);
    });

    test('returns effective directive correctly when passed violated directive and no effective directive', function() {
      var effectiveDirective = 'style-src';
      var violatedDirective = 'style-src http://example.com';
      var report = {
        'csp-report': {
          'violated-directive': violatedDirective
        }
      };

      assert.equal(get(report), effectiveDirective);
    });

    test('returns empty string when effective directive is not a proper effective directive and no violated directive is passed', function() {
      var effectiveDirective = 'blah';
      var report = {
        'csp-report': {
          'effective-directive': effectiveDirective
        }
      };

      assert.equal(get(report), '');
    });

    test('returns effective directive when effective directive is not a proper effective directive and a violated directive is passed', function() {
      var passedEffectiveDirective = 'blah';
      var expectedEffectiveDirective = 'style-src';
      var violatedDirective = 'style-src http://example.com';
      var report = {
        'csp-report': {
          'effective-directive': passedEffectiveDirective,
          'violated-directive': violatedDirective
        }
      };

      assert.equal(get(report), expectedEffectiveDirective);
    });

    test('returns effective directive when effective directive is empty and a violated directive is passed', function() {
      var passedEffectiveDirective = '';
      var expectedEffectiveDirective = 'style-src';
      var violatedDirective = 'style-src http://example.com';
      var report = {
        'csp-report': {
          'effective-directive': passedEffectiveDirective,
          'violated-directive': violatedDirective
        }
      };

      assert.equal(get(report), expectedEffectiveDirective);
    });

    test('returns empty string both effective directive and violated directives are passed and empty', function() {
      var report = {
        'csp-report': {
          'effective-directive': '',
          'violated-directive': ''
        }
      };

      assert.equal(get(report), '');
    });
  });
});
