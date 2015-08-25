'use strict';

var assert = require('chai').assert;
var util = require('../lib/util');

suite(__filename.split('/').pop().replace('.js', ''), function() {
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

  suite('directive functions', function() {
    test('ensure getDirectives returns the right directives', function() {
      assert.deepEqual(util.getDirectives(), [
          'base-uri',
          'child-src',
          'connect-src',
          'font-src',
          'form-action',
          'frame-ancestors',
          'frame-src',
          'img-src',
          'media-src',
          'object-src',
          'plugin-types',
          'report-uri',
          'script-src',
          'sandbox',
          'style-src'
        ]
      );
    });

    test('valid effective directive is true', function() {
      assert.isTrue(util.isValidEffectiveDirective('img-src'));
    });

    test('invalid effective directive is false', function() {
      assert.isFalse(util.isValidEffectiveDirective('blah'));
    });
  });
});
