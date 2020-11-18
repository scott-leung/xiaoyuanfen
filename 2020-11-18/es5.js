// 自写的 polyfill
require('../polyfill');
const util = require('../util');

function MakeInvisibleRandomProp(obj, val) {
  while (true) {
    var random = Math.random().toString().slice(2, 12);
    var prop = '__INVISIBLE_RANDOM_PROP__' + random;
    // 自适应 优先使用Symbol
    if (typeof Symbol !== 'undefined') {
      prop = Symbol(prop);
      // console.log(prop);
    }
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
  if (argArr === void 0) argArr = [];
  // Array.from 已经经过 polyfill
  if (!Array.isArray(argArr)) argArr = Array.from(argArr);
  var args = [];
  ctx = ctx || util.getGlobalHandle();
  var fn = this;
  var prop = MakeInvisibleRandomProp(ctx, fn);
  for (var i = 0; i < argArr.length; i++) {
    args.push('argArr[' + i + ']');
  }
  var res = args.length > 0 ? eval('ctx[prop](' + args + ')') : ctx[prop]();
  delete ctx[prop];
  return res;
}

Function.prototype.myCall = function (ctx) {
  var args = Array.prototype.slice.myApply(arguments, [1]);
  return this.myApply(ctx, args);
}

Function.prototype.myBind = function (ctx) {
  var fn = this;
  return function() {
    return fn.myApply(ctx, arguments);
  }
}
