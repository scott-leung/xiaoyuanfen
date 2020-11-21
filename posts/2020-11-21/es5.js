// 自写的 polyfill
require('../../polyfill');
const util = require('../../util');

// 关键方法，制作一个不可枚举随机属性并返回属性值
function makeInvisibleRandomProp(obj, val) {
  while (true) {
    var random = Math.random().toString().slice(2, 12);
    var prop = '__INVISIBLE_RANDOM_PROP__' + random;
    // 自适应 优先使用Symbol
    if (typeof Symbol !== 'undefined') {
      prop = Symbol(prop);
    }
    // 属性冲突，重新分配
    if (obj.hasOwnProperty(prop)) continue;
    Object.defineProperty(obj, prop, {
      // 使其变成不可枚举的属性
      enumerable: false,
      // 这里需要定义为可配置，否则属性无法删除
      configurable: true,
      value: val
    });
    return prop;
  }
}

Function.prototype.myApply = function (ctx, argArr) {
  if (argArr === void 0 || argArr === null) argArr = [];
  if (!util.isObj(argArr)) throw Error('argArr need Array[Like].');
  // Array.from 已经经过 polyfill
  argArr = Array.from(argArr);
  var args = [];
  // 这里上下文为无效值时自动判定当前环境
  // 浏览器中分配 window，node 中分配 global
  ctx = ctx || util.getGlobalHandle();
  var fn = this;
  var prop = makeInvisibleRandomProp(ctx, fn);
  for (var i = 0; i < argArr.length; i++) {
    args.push('argArr[' + i + ']');
  }
  var res = eval('ctx[prop](' + args + ')');
  delete ctx[prop];
  return res;
}

Function.prototype.myCall = function (ctx) {
  // 排除第一个参数 ctx
  var args = Array.prototype.slice.myApply(arguments, [1]);
  return this.myApply(ctx, args);
}

Function.prototype.myBind = function (ctx) {
  var fn = this;
  return function() {
    return fn.myApply(ctx, arguments);
  }
}
