'use strict';

var assert = require('chai').assert;
var get = require('../../../lib/get/sourceFile').get;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    test('get is a function', function() {
      assert.isFunction(get);
    });

    test('source-file is full path when source-file and referer use the same domain and referer has no path', function() {
      var url = 'http://example.com';
      var path = '/test';
      var payload = {
        'csp-report': {
          'source-file': url + path
        }
      };
      var headers = {
        'referer': url
      };

      assert.equal(get(payload, headers), url + path);
    });

    test('source-file is full path when source-file and referer use the same domain and referer has a path', function() {
      var url = 'http://example.com';
      var path = '/test';
      var payload = {
        'csp-report': {
          'source-file': url + path
        }
      };
      var headers = {
        'referer': url + '/test2'
      };

      assert.equal(get(payload, headers), url + path);
    });

    test('source-file is domain only when source-file and referer use different domains and referer has no path', function() {
      var url = 'http://example.com';
      var path = '/test';
      var payload = {
        'csp-report': {
          'source-file': url + path
        }
      };
      var headers = {
        'referer': 'http://test.com'
      };

      assert.equal(get(payload, headers), url);
    });

    test('source-file is domain only when source-file and referer use different domains and referer has a path', function() {
      var url = 'http://example.com';
      var path = '/test';
      var payload = {
        'csp-report': {
          'source-file': url + path
        }
      };
      var headers = {
        'referer': 'http://test.com/test2'
      };

      assert.equal(get(payload, headers), url);
    });

    test('source-file is domain only when no referer is available', function() {
      var url = 'http://example.com';
      var path = '/test';
      var payload = {
        'csp-report': {
          'source-file': url + path
        }
      };

      assert.equal(get(payload, {}), url);
    });

    test('empty string when csp-report is set and the source-file is not set', function() {
      var payload = {
        'csp-report': ''
      };

      assert.equal(get(payload, {}), '');
    });

    test('empty string is used when payload is empty', function() {
      var payload = {};

      assert.equal(get(payload, {}), '');
    });
  });
});
