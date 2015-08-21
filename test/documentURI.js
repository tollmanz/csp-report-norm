'use strict';

var assert = require('chai').assert;
var sanitize = require('../lib/sanitize/documentURI').sanitize;

suite('sanitize', function() {
  suite('document-uri', function() {
    test('sanitize is a function', function() {
      assert.isFunction(sanitize);
    });

    test('valid URL returns URL', function() {
      var url = 'http://example.com';
      assert.equal(sanitize(url), url);
    });

    test('valid URL with trailingslash returns URL', function() {
      var url = 'http://example.com/';
      assert.equal(sanitize(url), url);
    });

    test('invalid URL return empty string', function() {
      assert.equal(sanitize('testing'), '');
    });

    test('IP address with protocol returns IP address with protocol', function() {
      var ipWithProtocol = 'http://127.0.0.1';
      assert.equal(sanitize(ipWithProtocol), ipWithProtocol);
    });

    test('IP address alone returns IP address alone', function() {
      var ipWithoutProtocol = 'http://127.0.0.1';
      assert.equal(sanitize(ipWithoutProtocol), ipWithoutProtocol);
    });

    test('document-url is used when document-uri is not available and document-url is and a valid URL is returned when passed', function() {
      var documentURI = '';
      var documentURL = 'http://example.com';
      assert.equal(sanitize(documentURI, documentURL), documentURL);
    });

    test('document-url is used when document-uri is not available and document-url is and an empty string is returned when passed an invalid URL', function() {
      assert.equal(sanitize('', 'testing'), '');
    });
  });
});
