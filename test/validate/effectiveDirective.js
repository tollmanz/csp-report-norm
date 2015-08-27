'use strict';

var assert = require('chai').assert;
var validate = require('../../lib/validate/effectiveDirective').validate;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('validate is a function', function() {
      assert.isFunction(validate);
    });

    test('returns true when directive is valid', function() {
      assert.isTrue(validate('base-uri'));
      assert.isTrue(validate('child-src'));
      assert.isTrue(validate('connect-src'));
      assert.isTrue(validate('font-src'));
      assert.isTrue(validate('form-action'));
      assert.isTrue(validate('frame-ancestors'));
      assert.isTrue(validate('frame-src'));
      assert.isTrue(validate('img-src'));
      assert.isTrue(validate('media-src'));
      assert.isTrue(validate('object-src'));
      assert.isTrue(validate('plugin-types'));
      assert.isTrue(validate('report-uri'));
      assert.isTrue(validate('script-src'));
      assert.isTrue(validate('sandbox'));
      assert.isTrue(validate('style-src'));
    });

    test('returns false when directive is not-valid', function() {
      assert.isFalse(validate(''));
      assert.isFalse(validate('blah'));
      assert.isFalse(validate('img-src-blah'));
      assert.isFalse(validate('blah-img-src'));
    });
  });
});
