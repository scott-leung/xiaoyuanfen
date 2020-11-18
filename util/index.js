function isNode() {
  return !!(
    typeof process !== 'undefined' &&
    process.versions &&
    process.versions.node
  );
}

function getGlobalHandle() {
  if (this instanceof getGlobalHandle)
    throw Error('getGlobalHandle can not be newed.');
  return isNode() ? global : window;
}

module.exports = {
  isNode,
  getGlobalHandle,
}

// js how to judge strict environment
