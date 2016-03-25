'use strict';

var assert = require('chai').assert;
var sanitize = require('../../lib/sanitize/violatedDirective').sanitize;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('sanitize is a function', function() {
      assert.isFunction(sanitize);
    });

    test('string with valid directives is unchanged', function() {
      var expected = 'default-src https://example.com; img-src https://test.com';
      assert.equal(sanitize(expected), expected);
    });

    test('string with a single directive is unchanged', function() {
      var expected = 'default-src https://example.com';
      assert.equal(sanitize(expected), expected);
    });

    test('string with invalid directive is stripped out', function() {
      var directive = 'default-src https://example.com; whatever heyo; img-src https://test.com';
      var expected = 'default-src https://example.com; img-src https://test.com';

      assert.equal(sanitize(directive), expected);
    });

    test('string with a single invalid directive returns empty string', function() {
      var directive = 'blah https://example.com';
      assert.equal(sanitize(directive), '');
    });
  });
});
