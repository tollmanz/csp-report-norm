'use strict';

var assert = require('chai').assert;
var normalize = require('../../lib/normalize').normalize;

suite(__filename.split('/').pop().replace('.js', ''), function () {
  test('does not alter values for a valid report', function () {
    var payload = {
      'csp-report': {
        'document-uri': 'http://example.com/csp?os=OS%20X&device=&browser_version=43.0&browser=chrome&os_version=Lion',
        'referrer': '',
        'violated-directive': 'child-src https://example.com/',
        'effective-directive': 'frame-src',
        'original-policy': 'default-src https://example.com/; child-src https://example.com/; connect-src https://example.com/; font-src https://example.com/; img-src https://example.com/; media-src https://example.com/; object-src https://example.com/; script-src https://example.com/; style-src https://example.com/; form-action https://example.com/; frame-ancestors \'none\'; plugin-types \'none\'; report-uri http://example.com/csp-report?os=OS%20X&device=&browser_version=43.0&browser=chrome&os_version=Lion',
        'blocked-uri': 'http://google.com',
        'status-code': 200
      }
    };
    var headers = {
      'referer': 'http://example.com'
    };

    assert.deepEqual(normalize(payload, headers), payload);
  });

  test('correctly normalizes a Firefox style report', function () {
    var payload = {
      'csp-report': {
        'blocked-uri': 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
        'document-uri': 'http://example.com/csp?os=OS%20X&device=&browser_version=37.0&browser=firefox&os_version=Yosemite',
        'original-policy': 'default-src https://example.com/; connect-src https://example.com/; font-src https://example.com/; img-src https://example.com/; media-src https://example.com/; object-src https://example.com/; script-src https://example.com/; style-src https://example.com/; form-action https://example.com/; frame-ancestors \'none\'; report-uri http://example.com/csp-report?os=OS%20X&device=&browser_version=37.0&browser=firefox&os_version=Yosemite',
        'referrer': '',
        'violated-directive': 'img-src https://example.com/'
      }
    };
    var headers = {
      'referer': 'http://example.com'
    };
    var expected = {
      'csp-report': {
        'document-uri': 'http://example.com/csp?os=OS%20X&device=&browser_version=37.0&browser=firefox&os_version=Yosemite',
        'referrer': '',
        'violated-directive': 'img-src https://example.com/',
        'effective-directive': 'img-src',
        'original-policy': 'default-src https://example.com/; connect-src https://example.com/; font-src https://example.com/; img-src https://example.com/; media-src https://example.com/; object-src https://example.com/; script-src https://example.com/; style-src https://example.com/; form-action https://example.com/; frame-ancestors \'none\'; report-uri http://example.com/csp-report?os=OS%20X&device=&browser_version=37.0&browser=firefox&os_version=Yosemite',
        'blocked-uri': 'data',
        'status-code': 0
      }
    };

    assert.deepEqual(normalize(payload, headers), expected);
  });

  test('correctly normalizes a Webkit style report', function () {
    var payload = {
      'csp-report': {
        'document-uri': 'http://example.com/csp?os=OS%20X&device=&browser_version=23.0&browser=chrome&os_version=Lion',
        'violated-directive': 'default-src https://example.com/',
        'original-policy': 'default-src https://example.com/; child-src https://example.com/; connect-src https://example.com/; font-src https://example.com/; img-src https://example.com/; media-src https://example.com/; object-src https://example.com/; script-src https://example.com/; style-src https://example.com/; form-action https://example.com/; frame-ancestors \'none\'; plugin-types \'none\'; report-uri http://example.com/csp-report?os=OS%20X&device=&browser_version=23.0&browser=chrome&os_version=Lion',
        'blocked-uri': 'http://google.com'
      }
    };
    var headers = {
      'referer': 'http://example.com'
    };
    var expected = {
      'csp-report': {
        'document-uri': 'http://example.com/csp?os=OS%20X&device=&browser_version=23.0&browser=chrome&os_version=Lion',
        'referrer': '',
        'violated-directive': 'default-src https://example.com/',
        'effective-directive': 'default-src',
        'original-policy': 'default-src https://example.com/; child-src https://example.com/; connect-src https://example.com/; font-src https://example.com/; img-src https://example.com/; media-src https://example.com/; object-src https://example.com/; script-src https://example.com/; style-src https://example.com/; form-action https://example.com/; frame-ancestors \'none\'; plugin-types \'none\'; report-uri http://example.com/csp-report?os=OS%20X&device=&browser_version=23.0&browser=chrome&os_version=Lion',
        'blocked-uri': 'http://google.com',
        'status-code': 0
      }
    };

    assert.deepEqual(normalize(payload, headers), expected);
  });

  test('correctly normalizes a Webkit style report', function () {
    var payload = {
      'document-url': 'http://example.com/csp?os=OS%20X&device=&browser_version=23.0&browser=chrome&os_version=Lion',
      'violated-directive': 'default-src https://example.com/'
    };
    var headers = {
      'referer': 'http://example.com'
    };
    var expected = {
      'csp-report': {
        'document-uri': 'http://example.com/csp?os=OS%20X&device=&browser_version=23.0&browser=chrome&os_version=Lion',
        'referrer': '',
        'violated-directive': 'default-src https://example.com/',
        'effective-directive': 'default-src',
        'original-policy': '',
        'blocked-uri': '',
        'status-code': 0
      }
    };

    assert.deepEqual(normalize(payload, headers), expected);
  });
});