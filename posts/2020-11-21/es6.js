const util = require('../../util');

// 关键方法，制作一个不可见随机属性并返回属性值
function makeInvisibleRandomProp(obj, val) {
  let random = Math.random().toString().slice(2, 12);
  // 这里使用 Symbol 保证了没有属性冲突，所以不需要循环判定
  let prop = Symbol('__INVISIBLE_RANDOM_PROP__' + random);
  Object.defineProperty(obj, prop, {
    // 使其变成不可枚举的属性
    enumerable: false,
    // 这里需要定义为可配置，否则属性无法删除
    configurable: true,
    value: val
  });
  return prop;
}

Function.prototype.myApply = function (ctx, argArr = []) {
  if (argArr === void 0 || argArr === null) argArr = [];
  if (!util.isObj(argArr)) throw Error('argArr need Array[Like].');
  argArr = Array.from(argArr);
  ctx = ctx || util.getGlobalHandle();
  let fn = this;
  let prop = makeInvisibleRandomProp(ctx, fn);
  let res = ctx[prop](...argArr);
  delete ctx[prop];
  return res;
}

Function.prototype.myCall = function (ctx, ...args) {
  return this.myApply(ctx, args);
}

Function.prototype.myBind = function (ctx) {
  return (...args) => this.myApply(ctx, args);
}
