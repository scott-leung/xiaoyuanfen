const util = require('../util');

function MakeInvisibleRandomProp(obj, val) {
  while (true) {
    let random = Math.random().toString().slice(2, 12);
    let prop = Symbol('__MakeInvisibleRandomProp__' + random);
    if (obj.hasOwnProperty(prop)) continue;
    Object.defineProperty(obj, prop, {
      enumerable: false,
      configurable: true,
      value: val
    });
    return prop;
  }
}

Function.prototype.myApply = function (ctx, argArr) {
  ctx = ctx || util.getGlobalHandle();
  let fn = this;
  let prop = MakeInvisibleRandomProp(ctx, fn);
  let res = argArr ? ctx[prop](...argArr) : ctx[prop]();
  delete ctx[prop];
  return res;
}

Function.prototype.myCall = function (ctx, ...args) {
  return this.myApply(ctx, args);
}

Function.prototype.myBind = function (ctx) {
  let fn = this;
  return function (...args) {
    return fn.myApply(ctx, args);
  }
}
