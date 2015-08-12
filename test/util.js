'use strict';

var should = require('chai').should(); // jshint ignore:line
var expect = require('chai').expect; // jshint ignore:line
var util = require('../lib/util');

describe('util\'s globally unique identifier functions', function() {
  it('globally unique identifiers should be an array', function() {
    expect(util.getGloballyUniqueIdentifiers()).to.be.a('array');
  });

  it('globally unique identifiers should return specific values', function() {
    expect(util.getGloballyUniqueIdentifiers()).to.deep.equal(['data', 'filesystem', 'blob']);
  });

  it('data URI is a globally unique identifier', function() {
    expect(util.isGloballyUniqueIdentifier('data:xxxxxx')).to.equal(true);
  });

  it('data globally unique identifier is a globally unique identifier', function() {
    expect(util.isGloballyUniqueIdentifier('data')).to.equal(true);
  });

  it('blob URI is a globally unique identifier', function() {
    expect(util.isGloballyUniqueIdentifier('blob:xxxxxx')).to.equal(true);
  });

  it('blob globally unique identifier is a globally unique identifier', function() {
    expect(util.isGloballyUniqueIdentifier('blob')).to.equal(true);
  });

  it('filesystem URI is a globally unique identifier', function() {
    expect(util.isGloballyUniqueIdentifier('filesystem:xxxxxx')).to.equal(true);
  });

  it('filesystem globally unique identifier is a globally unique identifier', function() {
    expect(util.isGloballyUniqueIdentifier('filesystem')).to.equal(true);
  });

  it('data URI sanitizes to data', function() {
    expect(util.sanitizeGloballyUniqueIdentifier('data:xxxxxx')).to.equal('data');
  });

  it('data sanitizes to data', function() {
    expect(util.sanitizeGloballyUniqueIdentifier('data')).to.equal('data');
  });

  it('blob URI sanitizes to blob', function() {
    expect(util.sanitizeGloballyUniqueIdentifier('blob:xxxxxx')).to.equal('blob');
  });

  it('blob sanitizes to blob', function() {
    expect(util.sanitizeGloballyUniqueIdentifier('blob')).to.equal('blob');
  });

  it('filesystem URI sanitizes to filesystem', function() {
    expect(util.sanitizeGloballyUniqueIdentifier('filesystem:xxxxxx')).to.equal('filesystem');
  });

  it('filesystem sanitizes to filesystem', function() {
    expect(util.sanitizeGloballyUniqueIdentifier('filesystem')).to.equal('filesystem');
  });
});
