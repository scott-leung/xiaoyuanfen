var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

if (!Number.hasOwnProperty('MAX_SAFE_INTEGER') || typeof Number.MAX_SAFE_INTEGER === 'undefined') {
  Number.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
}

module.exports = {
  MAX_SAFE_INTEGER
}
