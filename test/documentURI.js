'use strict';

var assert = require('chai').assert;
var sanitize = require('../lib/sanitize/documentURI').sanitize;

suite('sanitize', function() {
  suite('document-uri', function() {
    test('sanitize is a function', function() {
      assert.isFunction(sanitize);
    });
  });
});
