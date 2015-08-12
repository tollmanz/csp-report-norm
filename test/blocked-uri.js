'use strict';

var should = require('chai').should(); // jshint ignore:line
var sanitize = require('../handlers/blocked-uri').sanitize;

describe('handlers/blocked-uri', function() {
  it('converts data URIs to data', function() {
    sanitize('data:xxxxxxxx').should.equal('data');
  });

  it('converts filesystem URIs to filesystem', function() {
    sanitize('filesystem:xxxxxxxx').should.equal('filesystem');
  });

  it('converts blob URIs to blob', function() {
    sanitize('blob:xxxxxxxx').should.equal('blob');
  });

  it('converts a non-URI string to an empty string', function() {
    sanitize('test', {}).should.equal('');
  });

  it('returns the origin of a blocked URI when it does not match the protected resource\'s origin ', function() {
    sanitize('http://www.example.com/hello-world', 'http://www.another-example.com').should.equal('http://www.example.com/');
  });

  it('returns the full blocked URI when it matches the protected resource\'s origin ', function() {
    sanitize('http://www.example.com/hello-world', 'http://www.another-example.com').should.equal('http://www.example.com/');
  });
});
