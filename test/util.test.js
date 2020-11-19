const assert = require('assert');
const util = require('../util');
const path = require('path');

describe('util.js', function () {

  it('should return true when the env is node', function () {
    if (typeof window !== 'undefined') return this.skip();
    assert(util.isNode() === true);
  });

  it('should return global instance when the env is node', function () {
    if (typeof window !== 'undefined') return this.skip();
    assert(util.getGlobalHandle() === global);
  });

  it('should return false when the env is broswer', function () {
    if (typeof window === 'undefined') return this.skip();
    assert(util.isNode() === false);
  });

  it('should return window instance when the env is broswer', function () {
    if (typeof window === 'undefined') return this.skip();
    assert(util.getGlobalHandle() === window);
  });
  
  it('should return more than 2 files when use findFileBySuffix with the suffix - .test.js', function () {
    const files = util.findFileBySuffix(__dirname, '.test.js');
    assert(files.length > 2);
  });
    
  it('should return more than 3 files when use findFileBySuffix with the suffix - .test.js|.js', function () {
    const files = util.findFileBySuffix(__dirname, ['.test.js', '.js']);
    assert(files.length > 3);
  });

  it('should return empty array when use findFileBySuffix with the suffix - .none', function () {
    const files = util.findFileBySuffix(__dirname, '.none');
    assert(files.length <= 0);
  });
    
  it('should return at least 1 file when use findFileExcludeSuffix with the suffix - .test.js', function () {
    const files = util.findFileExcludeSuffix(__dirname, '.test.js');
    assert(files.length >= 1);
  });
    
  it('should return empty array when use findFileExcludeSuffix with the suffix - .test.js|.js', function () {
    const files = util.findFileExcludeSuffix(__dirname, ['.test.js', '.js']);
    assert(files.length <= 0);
  });

  it('should return all files when use findFileExcludeSuffix the suffix is .none', function () {
    const files = util.findFileExcludeSuffix(__dirname, '.none');
    assert(files.length >= 3);
  });

  // TODO need to test "matchBySuffix"
});