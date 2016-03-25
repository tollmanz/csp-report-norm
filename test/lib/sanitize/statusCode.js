'use strict';

var assert = require('chai').assert;
var sanitize = require('../../../lib/sanitize/statusCode').sanitize;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('sanitize is a function', function() {
      assert.isFunction(sanitize);
    });

    test('status code is always a number', function() {
      assert.isNumber(sanitize(''));
      assert.isNumber(sanitize('0'));
      assert.isNumber(sanitize('1'));
      assert.isNumber(sanitize(0));
      assert.isNumber(sanitize(200));
      assert.isNumber(sanitize({}));
    });

    test('status code is zero when not a valid status code', function() {
      assert.equal(sanitize(''), 0);
      assert.equal(sanitize('two-hundred'), 0);
      assert.equal(sanitize(-1), 0);
      assert.equal(sanitize('-1'), 0);
      assert.equal(sanitize({}), 0);
    });

    test('status code is unchanged when it is a valid number', function() {
      assert.equal(sanitize(200), 200);
      assert.equal(sanitize('200'), 200);
      assert.equal(sanitize(0), 0);
      assert.equal(sanitize('0'), 0);
    });
  });
});
