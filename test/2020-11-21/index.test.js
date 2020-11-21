const assert = require('assert');
const util = require('../../util');

describe('2020-11-21 making "myApply" incorrectly', function () {
  let window = util.getGlobalHandle();
  let obj = { numA: 123, fn: 333 };

  function add(num1 = 11, num2 = 22) {
    // console.log(`num1[${num1}], num2[${num2}]`, this);
    return this.numA + num1 + num2;
  }

  function add2(num1) {
    return this.numA + this.fn + num1;
  }

  before(() => {
    window.numA = 999;
    window.fn = 222;
    require('../../posts/2020-11-21/wrong_example');
  });

  after(() => {
    delete window.numA;
    delete window.fn;
    delete Function.prototype.myApply;
  });

  // 此时结果还是可以的
  it(`the result of "myApply" should be equal to the result of "apply"`, () => {
    assert(add.myApply(obj) === add.apply(obj));
    assert(add.myApply(obj, [666]) === add.apply(obj, [666]));
    assert(add.myApply(obj, [666, 4]) === add.apply(obj, [666, 4]));
    assert(add.myApply(obj, [123, 1, 4]) === add.apply(obj, [123, 1, 4]));
    assert(add.myApply(null, [666, 4]) === add.apply(null, [666, 4]));
    assert(add.myApply(null, [123, 1, 4]) === add.apply(null, [123, 1, 4]));
  });

  // 明显错误。全不等
  it(`the result of "myApply" should not be equal to the result of "apply"`, () => {
    assert(add2.myApply(obj) !== add2.apply(obj));
    assert(add2.myApply(obj, [666]) !== add2.apply(obj, [666]));
    assert(add2.myApply(obj, [666, 4]) !== add2.apply(obj, [666, 4]));
    assert(add2.myApply(obj, [123, 1, 4]) !== add2.apply(obj, [123, 1, 4]));
    assert(add2.myApply(null, [666, 4]) !== add2.apply(null, [666, 4]));
    assert(add2.myApply(null, [123, 1, 4]) !== add2.apply(null, [123, 1, 4]));
  });
});

describe('2020-11-21 Write myApply, myCall, myBind', function () {
  
  describe('# ES5 runtime', () => {
    let window = util.getGlobalHandle();
    let obj = { numA: 123 };

    function add(num1 = 11, num2 = 22) {
      // console.log(`num1[${num1}], num2[${num2}]`, this);
      return this.numA + num1 + num2;
    }

    before(() => {
      window.numA = 999;
      require('../../posts/2020-11-21/es5');
    });

    after(() => {
      delete window.numA;
      delete Function.prototype.myApply;
      delete Function.prototype.myCall;
      delete Function.prototype.myBind;
    });

    it(`the result of "myApply" should be equal to the result of "apply"`, () => {
      assert(add.myApply(obj) === add.apply(obj));
      assert(add.myApply(obj, [666]) === add.apply(obj, [666]));
      assert(add.myApply(obj, [666, 4]) === add.apply(obj, [666, 4]));
      assert(add.myApply(obj, [123, 1, 4]) === add.apply(obj, [123, 1, 4]));
      assert(add.myApply(null, [666, 4]) === add.apply(null, [666, 4]));
      assert(add.myApply(null, [123, 1, 4]) === add.apply(null, [123, 1, 4]));
      assert.notDeepStrictEqual(add.myApply(obj, null) === add.apply(obj, null));
      assert.throws(() => { add.myApply(obj, 123) });
      assert.throws(() => { add.apply(obj, 123) });
      assert.throws(() => { add.myApply(obj, 'sdf') });
      assert.throws(() => { add.apply(obj, 'sdf') });
    });

    it(`the result of "myCall" should be equal to the result of "call"`, () => {
      assert(add.myCall(obj) === add.call(obj));
      assert(add.call(obj, 666) === add.call(obj, 666));
      assert(add.call(obj, 666, 55) === add.call(obj, 666, 55));
      assert(add.call(obj, 32, 65, 12) === add.call(obj, 32, 65, 12));
      assert(add.call(null, 666, 55) === add.call(null, 666, 55));
      assert(add.call(null, 32, 65, 12) === add.call(null, 32, 65, 12));
    });

    it(`the result of "myBind" should be equal to the result of "bind"`, () => {
      const fn1 = add.myBind(obj);
      const fn2 = add.bind(obj);
      assert(fn1() === fn2());
      assert(fn1(12) === fn2(12));
      assert(fn1(12, 45) === fn2(12, 45));
      assert(fn1(12, 65, 98) === fn2(12, 65, 98));
      const fn3 = add.myBind(null);
      const fn4 = add.bind(null);
      assert(fn3() === fn4());
      assert(fn3(12) === fn4(12));
      assert(fn3(12, 45) === fn4(12, 45));
      assert(fn3(12, 65, 98) === fn4(12, 65, 98));
    });
  });

  describe('# ES6 runtime', () => {
    let window = util.getGlobalHandle();
    let obj = { numA: 123 };

    function add(num1 = 11, num2 = 22) {
      // console.log(`num1[${num1}], num2[${num2}]`, this);
      return this.numA + num1 + num2;
    }

    before(() => {
      window.numA = 999;
      require('../../posts/2020-11-21/es6');
    });

    after(() => {
      delete window.numA;
      delete Function.prototype.myApply;
      delete Function.prototype.myCall;
      delete Function.prototype.myBind;
    });

    it(`the result of "myApply" should be equal to the result of "apply"`, () => {
      assert(add.myApply(obj) === add.apply(obj));
      assert(add.myApply(obj, [666]) === add.apply(obj, [666]));
      assert(add.myApply(obj, [666, 4]) === add.apply(obj, [666, 4]));
      assert(add.myApply(obj, [123, 1, 4]) === add.apply(obj, [123, 1, 4]));
      assert(add.myApply(null, [666, 4]) === add.apply(null, [666, 4]));
      assert(add.myApply(null, [123, 1, 4]) === add.apply(null, [123, 1, 4]));
      assert(add.myApply(obj, {length: 2, 0: 12, 1: 123}) === add.apply(obj, {length: 2, 0: 12, 1: 123}));
      assert(add.myApply(obj, null) === add.apply(obj, null));
      assert.throws(() => { add.myApply(obj, 123) });
      assert.throws(() => { add.apply(obj, 123) });
      assert.throws(() => { add.myApply(obj, 'sdf') });
      assert.throws(() => { add.apply(obj, 'sdf') });
    });

    it(`the result of "myCall" should be equal to the result of "call"`, () => {
      assert(add.myCall(obj) === add.call(obj));
      assert(add.call(obj, 666) === add.call(obj, 666));
      assert(add.call(obj, 666, 55) === add.call(obj, 666, 55));
      assert(add.call(obj, 32, 65, 12) === add.call(obj, 32, 65, 12));
      assert(add.call(null, 666, 55) === add.call(null, 666, 55));
      assert(add.call(null, 32, 65, 12) === add.call(null, 32, 65, 12));
    });

    it(`the result of "myBind" should be equal to the result of "bind"`, () => {
      const fn1 = add.myBind(obj);
      const fn2 = add.bind(obj);
      assert(fn1() === fn2());
      assert(fn1(12) === fn2(12));
      assert(fn1(12, 45) === fn2(12, 45));
      assert(fn1(12, 65, 98) === fn2(12, 65, 98));
      const fn3 = add.myBind(null);
      const fn4 = add.bind(null);
      assert(fn3() === fn4());
      assert(fn3(12) === fn4(12));
      assert(fn3(12, 45) === fn4(12, 45));
      assert(fn3(12, 65, 98) === fn4(12, 65, 98));
    });
  });
});
