'use strict';

var assert = require('chai').assert;
var sanitize = require('../../lib/sanitize/violatedDirective').sanitize;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('sanitize is a function', function() {
      assert.isFunction(sanitize);
    });
  });
});
