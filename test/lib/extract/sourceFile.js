'use strict';

var assert = require('chai').assert;
var extract = require('../../../lib/extract/sourceFile').extract;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('extract is a function', function() {
      assert.isFunction(extract);
    });

    test('extract finds source-file when it exists', function() {
      var sourceFile = 'http://google.com';
      var report = {
        'csp-report': {
          'source-file': sourceFile
        }
      };

      assert.equal(extract(report), sourceFile);
    });

    test('extract finds source-file when it exists and is an empty string', function() {
      var sourceFile = '';
      var report = {
        'csp-report': {
          'source-file': sourceFile
        }
      };

      assert.equal(extract(report), sourceFile);
    });

    test('extract returns empty string when `source-file` is not set', function() {
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
