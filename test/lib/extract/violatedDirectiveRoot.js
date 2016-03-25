'use strict';

var assert = require('chai').assert;
var extract = require('../../../lib/extract/violatedDirectiveRoot').extract;

suite(__dirname.split('/').pop(), function () {
  suite(__filename.split('/').pop().replace('.js', ''), function () {
    test('extract is a function', function () {
      assert.isFunction(extract);
    });

    test('extract finds directive when it exists', function () {
      var violatedDirective = 'img-src \'self\'';
      var report = {
        'violated-directive': violatedDirective
      };

      assert.equal(extract(report), violatedDirective);
    });

    test('extract returns empty string when `violated-directive` is not set', function () {
      var report = {};

      assert.equal(extract(report), '');
    });
  });
});
