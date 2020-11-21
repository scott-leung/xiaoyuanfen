const util = require('../../util');

Function.prototype.myApply = function (ctx, argArr = []) {
  // 这里上下文为无效值时自动判定当前环境
  // 浏览器中分配 window，node 中分配 global
  ctx = ctx || util.getGlobalHandle();
  ctx.fn = this;
  let res = ctx.fn(...argArr);
  delete ctx.fn;
  return res;
}
