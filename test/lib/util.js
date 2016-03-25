'use strict';

var assert = require('chai').assert;
var util = require('../../lib/util');

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
    test('getDirectives is a function', function() {
      assert.isFunction(util.getDirectives);
    });

    test('ensure getDirectives returns the right directives', function() {
      assert.deepEqual(util.getDirectives(), [
        'base-uri',
        'child-src',
        'connect-src',
        'default-src',
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
      ]);
    });

    test('isEffectiveDirective is a function', function() {
      assert.isFunction(util.isEffectiveDirective);
    });

    test('returns true when directive is valid', function() {
      assert.isTrue(util.isEffectiveDirective('base-uri'));
      assert.isTrue(util.isEffectiveDirective('child-src'));
      assert.isTrue(util.isEffectiveDirective('connect-src'));
      assert.isTrue(util.isEffectiveDirective('default-src'));
      assert.isTrue(util.isEffectiveDirective('font-src'));
      assert.isTrue(util.isEffectiveDirective('form-action'));
      assert.isTrue(util.isEffectiveDirective('frame-ancestors'));
      assert.isTrue(util.isEffectiveDirective('frame-src'));
      assert.isTrue(util.isEffectiveDirective('img-src'));
      assert.isTrue(util.isEffectiveDirective('media-src'));
      assert.isTrue(util.isEffectiveDirective('object-src'));
      assert.isTrue(util.isEffectiveDirective('plugin-types'));
      assert.isTrue(util.isEffectiveDirective('report-uri'));
      assert.isTrue(util.isEffectiveDirective('script-src'));
      assert.isTrue(util.isEffectiveDirective('sandbox'));
      assert.isTrue(util.isEffectiveDirective('style-src'));
    });

    test('returns false when directive is not-valid', function() {
      assert.isFalse(util.isEffectiveDirective(''));
      assert.isFalse(util.isEffectiveDirective('blah'));
      assert.isFalse(util.isEffectiveDirective('img-src-blah'));
      assert.isFalse(util.isEffectiveDirective('blah-img-src'));
    });

    test('parseDirectiveString is a function', function() {
      assert.isFunction(util.parseDirectiveString);
    });

    test('ensure directive is correctly parsed when string has one directive', function() {
      var directiveString = 'default-src http://example.com';
      var expected = [
        {
          'directive':'default-src',
          'value': 'http://example.com'
        }
      ];

      assert.deepEqual(util.parseDirectiveString(directiveString), expected);
    });

    test('ensure directives are correctly parsed when multiple directives in a string', function() {
      var directiveString = 'default-src http://example.com; img-src http://test.com data:';
      var expected = [
        {
          'directive':'default-src',
          'value': 'http://example.com'
        },
        {
          'directive': 'img-src',
          'value': 'http://test.com data:'
        }
      ];

      assert.deepEqual(util.parseDirectiveString(directiveString), expected);
    });

    test('ensure invalid directives are removed from results', function() {
      var directiveString = 'default-src http://example.com; img-src http://test.com data:; whatever-thing hello';
      var expected = [
        {
          'directive':'default-src',
          'value': 'http://example.com'
        },
        {
          'directive': 'img-src',
          'value': 'http://test.com data:'
        }
      ];

      assert.deepEqual(util.parseDirectiveString(directiveString), expected);
    });
  });
});
