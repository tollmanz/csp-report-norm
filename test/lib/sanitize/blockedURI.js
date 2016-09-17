'use strict';

var assert = require('chai').assert;
var sanitize = require('../../../lib/sanitize/blockedURI').sanitize;
var isSpecialCase = require('../../../lib/sanitize/blockedURI').isSpecialCase;

suite(__dirname.split('/').pop(), function() {
  suite(__filename.split('/').pop().replace('.js', ''), function() {
    suite('sanitize', function () {
      test('sanitize is a function', function() {
        assert.isFunction(sanitize);
      });

      test('convert data URIs to data', function() {
        assert.equal(sanitize('data:xxxxxxxx'), 'data');
      });

      test('convert filesystem URIs to filesystem', function() {
        assert.equal(sanitize('filesystem:xxxxxxxx'), 'filesystem');
      });

      test('convert blob URIs to blob', function() {
        assert.equal(sanitize('blob:xxxxxxxx'), 'blob');
      });

      test('convert a non-URI string to an empty string', function() {
        assert.equal(sanitize('test', {}), '');
      });

      test('return the origin of a blocked URI when it does not match the protected resource\'s origin', function() {
        assert.equal(sanitize('http://www.example.com/hello-world', 'http://www.another-example.com'), 'http://www.example.com');
      });

      test('return the origin of a blocked URI when it does not match the protected resource\'s origin and the resource has a path', function() {
        assert.equal(sanitize('http://www.example.com/hello-world', 'http://www.another-example.com/yolo'), 'http://www.example.com');
      });

      test('return the full blocked URI when it matches the protected resource\'s origin', function() {
        assert.equal(sanitize('http://www.example.com/hello-world', 'http://www.example.com'), 'http://www.example.com/hello-world');
      });

      test('return the full blocked URI when it matches the protected resource\'s origin and the resource has a path', function() {
        assert.equal(sanitize('http://www.example.com/hello-world', 'http://www.example.com/testing'), 'http://www.example.com/hello-world');
      });

      test('return the full URI when protocol does not match', function() {
        assert.equal(sanitize('http://www.example.com/hello-world', 'https://www.example.com/testing'), 'http://www.example.com/hello-world');
      });

      test('return the host only when hosts don`t match but protocols do', function() {
        assert.equal(sanitize('https://www.examples.com/hello-world', 'https://www.example.com/testing'), 'https://www.examples.com');
      });

      test('return a special case blocked URI', function() {
        assert.equal(sanitize('about', 'https://www.example.com/testing'), 'about');
      });
    });

    suite('isSpecialCase', function() {
      test('isSpecialCase is a function', function() {
        assert.isFunction(isSpecialCase);
      });

      test('returns true when special case is passed', function() {
        assert.equal(isSpecialCase('about'), true);
        assert.equal(isSpecialCase('about:blank'), true);
        assert.equal(isSpecialCase(' about:blank'), true);
        assert.equal(isSpecialCase(' about:blank '), true);
        assert.equal(isSpecialCase('about:blank '), true);
        assert.equal(isSpecialCase('    about:blank     '), true);

        assert.equal(isSpecialCase('chromenull://'), true);
        assert.equal(isSpecialCase(' chromenull://'), true);
        assert.equal(isSpecialCase(' chromenull:// '), true);
        assert.equal(isSpecialCase('chromenull:// '), true);
        assert.equal(isSpecialCase('    chromenull://     '), true);
        assert.equal(isSpecialCase('safari-extension://com.evernote.safari.clipper-q79wdw8yh9'), true);
      });
    });
  });
});
