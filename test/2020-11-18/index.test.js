const assert = require('assert');
const util = require('../../util');

describe('2020-11-18 Write myApply, myCall, myBind', function () {
  
  describe('# ES5 runtime', () => {
    let window = util.getGlobalHandle();
    let obj = { numA: 123 };

    function add(num1, num2) {
      // console.log(`num1[${num1}], num2[${num2}]`, this);
      return this.numA + num1 + num2;
    }

    before(() => {
      window.numA = 999;
      require('../../2020-11-18/es5');
    });

    after(() => {
      delete window.numA;
      delete Function.prototype.myApply;
      delete Function.prototype.myCall;
      delete Function.prototype.myBind;
    });

    it(`"myApply" result should equal "apply" result`, () => {
      assert.notDeepStrictEqual(add.myApply(obj) === add.apply(obj));
      assert.notDeepStrictEqual(add.myApply(obj, [666]) === add.apply(obj, [666]));
      assert(add.myApply(obj, [666, 4]) === add.apply(obj, [666, 4]));
      assert(add.myApply(obj, [123, 1, 4]) === add.apply(obj, [123, 1, 4]));
      assert(add.myApply(null, [666, 4]) === add.apply(null, [666, 4]));
      assert(add.myApply(null, [123, 1, 4]) === add.apply(null, [123, 1, 4]));
    });

    it(`"myCall" result should equal "call" result`, () => {
      assert.notDeepStrictEqual(add.myCall(obj) === add.call(obj));
      assert.notDeepStrictEqual(add.call(obj, 666) === add.call(obj, 666));
      assert(add.call(obj, 666, 55) === add.call(obj, 666, 55));
      assert(add.call(obj, 32, 65, 12) === add.call(obj, 32, 65, 12));
      assert(add.call(null, 666, 55) === add.call(null, 666, 55));
      assert(add.call(null, 32, 65, 12) === add.call(null, 32, 65, 12));
    });

    it(`"myBind" result should equal "bind" result`, () => {
      const fn1 = add.myBind(obj);
      const fn2 = add.bind(obj);
      assert.notDeepStrictEqual(fn1() === fn2());
      assert.notDeepStrictEqual(fn1(12) === fn2(12));
      assert(fn1(12, 45) === fn2(12, 45));
      assert(fn1(12, 65, 98) === fn2(12, 65, 98));
      const fn3 = add.myBind(null);
      const fn4 = add.bind(null);
      assert.notDeepStrictEqual(fn3() === fn4());
      assert.notDeepStrictEqual(fn3(12) === fn4(12));
      assert(fn3(12, 45) === fn4(12, 45));
      assert(fn3(12, 65, 98) === fn4(12, 65, 98));
    });
  });

  describe('# ES6 runtime', () => {
    let window = util.getGlobalHandle();
    let obj = { numA: 123 };

    function add(num1, num2) {
      // console.log(`num1[${num1}], num2[${num2}]`, this);
      return this.numA + num1 + num2;
    }

    before(() => {
      window.numA = 999;
      require('../../2020-11-18/es6');
    });

    after(() => {
      delete window.numA;
      delete Function.prototype.myApply;
      delete Function.prototype.myCall;
      delete Function.prototype.myBind;
    });

    it(`"myApply" result should equal "apply" result`, () => {
      assert.notDeepStrictEqual(add.myApply(obj) === add.apply(obj));
      assert.notDeepStrictEqual(add.myApply(obj, [666]) === add.apply(obj, [666]));
      assert(add.myApply(obj, [666, 4]) === add.apply(obj, [666, 4]));
      assert(add.myApply(obj, [123, 1, 4]) === add.apply(obj, [123, 1, 4]));
      assert(add.myApply(null, [666, 4]) === add.apply(null, [666, 4]));
      assert(add.myApply(null, [123, 1, 4]) === add.apply(null, [123, 1, 4]));
    });

    it(`"myCall" result should equal "call" result`, () => {
      assert.notDeepStrictEqual(add.myCall(obj) === add.call(obj));
      assert.notDeepStrictEqual(add.call(obj, 666) === add.call(obj, 666));
      assert(add.call(obj, 666, 55) === add.call(obj, 666, 55));
      assert(add.call(obj, 32, 65, 12) === add.call(obj, 32, 65, 12));
      assert(add.call(null, 666, 55) === add.call(null, 666, 55));
      assert(add.call(null, 32, 65, 12) === add.call(null, 32, 65, 12));
    });

    it(`"myBind" result should equal "bind" result`, () => {
      const fn1 = add.myBind(obj);
      const fn2 = add.bind(obj);
      assert.notDeepStrictEqual(fn1() === fn2());
      assert.notDeepStrictEqual(fn1(12) === fn2(12));
      assert(fn1(12, 45) === fn2(12, 45));
      assert(fn1(12, 65, 98) === fn2(12, 65, 98));
      const fn3 = add.myBind(null);
      const fn4 = add.bind(null);
      assert.notDeepStrictEqual(fn3() === fn4());
      assert.notDeepStrictEqual(fn3(12) === fn4(12));
      assert(fn3(12, 45) === fn4(12, 45));
      assert(fn3(12, 65, 98) === fn4(12, 65, 98));
    });

  });

});
