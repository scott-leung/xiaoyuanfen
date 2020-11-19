const fs = require('fs');
const path = require('path');

/**
 * 判定是否在node环境
 * @returns {boolean}
 */
function isNode() {
  return !!(
    typeof process !== 'undefined' &&
    process.versions &&
    process.versions.node
  );
}

/**
 * 获取全局句柄
 * @returns {window|global}
 */
function getGlobalHandle() {
  if (this instanceof getGlobalHandle)
    throw Error('getGlobalHandle can not be newed.');
  return isNode() ? global : window;
}

/**
 * 后缀匹配字符串
 * @param {string} string 待匹配字符串
 * @param {string|string[]} suffix 后缀
 * @param {boolean} ignoreCase 是否忽略大小写
 * @returns {boolean} 是否匹配
 */
function matchBySuffix(string, suffix, ignoreCase = true) {
  if (!suffix) suffix = [];
  if (!Array.isArray(suffix)) {
    suffix = [suffix];
  }
  if (ignoreCase) {
    suffix = suffix.map(str => str.toLowerCase());
    string = string.toLowerCase();
  }
  const regx = new RegExp(`(${suffix.join('|')})`);
  return regx.test(string);
}

/**
 * 通过后缀匹配目录中文件
 * @param {string} dirPath 目录路径
 * @param {string | string[]} suffix 后缀，如 js, css等
 * @returns {string[]} 文件路径
 */
function findFileBySuffix(dirPath, suffix) {
  const files = fs.readdirSync(dirPath);
  const retFiles = [];
  for (let filename of files) {
    const subFilePath = path.join(dirPath, filename);
    const stat = fs.lstatSync(subFilePath);
    if (stat.isFile()) {
      if (matchBySuffix(subFilePath, suffix)) {
        retFiles.push(subFilePath);
      }
    } else if (stat.isDirectory()) {
      retFiles.push(...findFileBySuffix(subFilePath, suffix));
    }
  }
  return retFiles;
}

/**
 * 通过后缀排除目录中的文件
 * @param {string} dirPath 目录路径
 * @param {string | string[]} suffix 后缀，如 js, css等
 * @returns {string[]} 文件路径
 */
function findFileExcludeSuffix(dirPath, suffix) {
  const files = fs.readdirSync(dirPath);
  const retFiles = [];
  for (let filename of files) {
    const subFilePath = path.join(dirPath, filename);
    const stat = fs.lstatSync(subFilePath);
    if (stat.isFile()) {
      if (!matchBySuffix(subFilePath, suffix)) {
        retFiles.push(subFilePath);
      }
    } else if (stat.isDirectory()) {
      retFiles.push(...findFileExcludeSuffix(subFilePath, suffix));
    }
  }
  return retFiles;
}

module.exports = {
  isNode,
  getGlobalHandle,
  findFileBySuffix,
  findFileExcludeSuffix,
  matchBySuffix,
}

// js how to judge strict environment
