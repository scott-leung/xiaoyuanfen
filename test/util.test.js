const assert = require('assert');
const util = require('../util');

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
});