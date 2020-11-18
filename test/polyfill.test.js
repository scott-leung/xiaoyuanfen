const assert = require('assert');

describe('polyfill.js', function () {
  describe('Number polyfill', function () {
    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    const Num = require('../polyfill/number');

    it('should Number.MAX_SAFE_INTEGER is right', function () {
      assert(Num.MAX_SAFE_INTEGER === MAX_SAFE_INTEGER);
    });
  });

  describe('Array polyfill', function () {
    const Arr = require('../polyfill/array');
    it('should polyfill "Array.from" right', function () {
      assert.deepStrictEqual(Array.from([1, 2, 3]), Arr.from([1, 2, 3]));
      assert.deepStrictEqual(Array.from([]), Arr.from([]));
      assert.deepStrictEqual(Array.from(5), Arr.from(5));
      assert.deepStrictEqual(Array.from('123'), Arr.from('123'));
      assert.throws(() => {
        Arr.from(null);
      });
      assert.throws(() => {
        Array.from(null);
      });
      assert.throws(() => {
        Arr.from();
      });
      assert.throws(() => {
        Array.from();
      });
    });
  });

});