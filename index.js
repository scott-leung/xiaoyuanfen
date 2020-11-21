const inquirer = require('inquirer');
const colors = require('colors');
const util = require('./util');
const catalog = require('./catalog.json');
const path = require('path');
const { stdout, stderr } = require('process');
const spawn = require('child_process').spawn;

function findCatalogInfoByPath(relativePath) {
  const pathArr = relativePath.split(path.seq || '/');
  let root = catalog;
  while(pathArr.length) {
    const litPath = pathArr.shift();
    if (!root.child || !root.child[litPath]) return null;
    root = root.child[litPath];
  }
  return root;
}

function transformPath2Name(filePath) {
  const relativePath = filePath.slice(__dirname.length + 1);
  const pathInfo = path.parse(filePath);
  const catalogInfo = findCatalogInfoByPath(relativePath);
  if (!catalogInfo) return pathInfo.base;
  return `【${pathInfo.base}】- ${catalogInfo.name}`;
}

console.log(colors.green(`请选择需要测试的目录或文件。\n`));

inquirer.registerPrompt('file-tree-selection', require('inquirer-file-tree-selection-prompt'));

inquirer
  .prompt([{
    name: 'file',
    root: __dirname + '/test',
    onlyShowValid: true,
    type: 'file-tree-selection',
    message: '您的选择是：',
    validate(path) {
      const isFile = path.split('.').length > 1;
      return isFile ? util.matchBySuffix(path, '.test.js') : true;
    },
    transformer(input, ans, flag) {
      // console.log(input, ans, flag);
      return transformPath2Name(input);
    }
  }])
  .then(answers => {
    // console.log(answers);
    const args = [
      '--require',
      'intelli-espower-loader',
      '--extension',
      'test.js',
      '--recursive',
      answers.file
    ]
    spawn('mocha', args, { stdio: 'inherit' });
  })
  .catch(error => {
    console.error(error);
  });