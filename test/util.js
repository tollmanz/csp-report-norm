'use strict';

var assert = require('chai').assert;
var util = require('../lib/util');

suite('util', function() {
  suite('globally unique identifier functions', function() {
    test('globally unique identifiers should be an array', function() {
      assert.isArray(util.getGloballyUniqueIdentifiers());
    });

    test('globally unique identifiers should return specific values', function() {
      assert.deepEqual(util.getGloballyUniqueIdentifiers(), ['data', 'filesystem', 'blob']);
    });

    test('data URI is a globally unique identifier', function() {
      assert.isTrue(util.isGloballyUniqueIdentifier('data:xxxxxx'));
    });

    test('data globally unique identifier is a globally unique identifier', function() {
      assert.isTrue(util.isGloballyUniqueIdentifier('data'));
    });

    test('blob URI is a globally unique identifier', function() {
      assert.isTrue(util.isGloballyUniqueIdentifier('blob:xxxxxx'));
    });

    test('blob globally unique identifier is a globally unique identifier', function() {
      assert.isTrue(util.isGloballyUniqueIdentifier('blob'));
    });

    test('filesystem URI is a globally unique identifier', function() {
      assert.isTrue(util.isGloballyUniqueIdentifier('filesystem:xxxxxx'));
    });

    test('filesystem globally unique identifier is a globally unique identifier', function() {
      assert.isTrue(util.isGloballyUniqueIdentifier('filesystem'));
    });

    test('data URI sanitizes to data', function() {
      assert.equal(util.sanitizeGloballyUniqueIdentifier('data:xxxxxx'), 'data');
    });

    test('data sanitizes to data', function() {
      assert.equal(util.sanitizeGloballyUniqueIdentifier('data'), 'data');
    });

    test('blob URI sanitizes to blob', function() {
      assert.equal(util.sanitizeGloballyUniqueIdentifier('blob:xxxxxx'), 'blob');
    });

    test('blob sanitizes to blob', function() {
      assert.equal(util.sanitizeGloballyUniqueIdentifier('blob'), 'blob');
    });

    test('filesystem URI sanitizes to filesystem', function() {
      assert.equal(util.sanitizeGloballyUniqueIdentifier('filesystem:xxxxxx'), 'filesystem');
    });

    test('filesystem sanitizes to filesystem', function() {
      assert.equal(util.sanitizeGloballyUniqueIdentifier('filesystem'), 'filesystem');
    });
  });
});
