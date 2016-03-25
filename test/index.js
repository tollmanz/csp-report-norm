'use strict';

var assert = require('chai').assert;
var normalize = require('../index').normalize;

suite(__filename.split('/').pop().replace('.js', ''), function() {
  test('module returns a function', function() {
    assert.isFunction(normalize);
  });
});