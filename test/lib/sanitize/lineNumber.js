'use strict';

var assert = require('chai').assert;
var sanitize = require('../../../lib/sanitize/lineNumber').sanitize;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('sanitize is a function', function() {
      assert.isFunction(sanitize);
    });

    test('returns Integer for numeric values', function() {
      assert.strictEqual(sanitize(-1), -1);
      assert.strictEqual(sanitize(0), 0);
      assert.strictEqual(sanitize(1), 1);

      assert.strictEqual(sanitize('-1'), -1);
      assert.strictEqual(sanitize('0'), 0);
      assert.strictEqual(sanitize('1'), 1);

      assert.strictEqual(sanitize(-1.5), -1);
      assert.strictEqual(sanitize(0.0), 0);
      assert.strictEqual(sanitize(1.0), 1);

      assert.strictEqual(sanitize('-1.5'), -1);
      assert.strictEqual(sanitize('0.0'), 0);
      assert.strictEqual(sanitize('1.0'), 1);
    });

    test('returns -1 for non-numeric values', function() {
      assert.strictEqual(sanitize('a'), -1);
      assert.strictEqual(sanitize({}), -1);
      assert.strictEqual(sanitize([]), -1);
      assert.strictEqual(sanitize(null), -1);
      assert.strictEqual(sanitize(function(){}), -1);
    });
  });
});
