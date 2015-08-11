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
});
