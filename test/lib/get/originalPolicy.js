'use strict';

var assert = require('chai').assert;
var get = require('../../../lib/get/originalPolicy').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('returns original policy correctly when passed original policy', function() {
      var originalPolicy = 'default-src http://example.com; style-src http://example.com';
      var report = {
        'csp-report': {
          'original-policy': originalPolicy
        }
      };

      assert.equal(get(report), originalPolicy);
    });

    test('returns empty string when original policy is not proper', function() {
      var originalPolicy = 'blah http://example.com';
      var report = {
        'csp-report': {
          'original-policy': originalPolicy
        }
      };

      assert.equal(get(report), '');
    });

    test('removes invalid directives', function() {
      var originalPolicy = 'default-src \'self\'; blah http://example.com';
      var report = {
        'csp-report': {
          'original-policy': originalPolicy
        }
      };

      assert.equal(get(report), 'default-src \'self\'');
    });
  });
});
