const inquirer = require('inquirer');
const colors = require('colors');
const util = require('./util');

console.log(colors.green(`Please choose the target to test.\n`));

inquirer.registerPrompt('file-tree-selection', require('inquirer-file-tree-selection-prompt'));

inquirer
  .prompt([{
    name: 'files',
    root: __dirname,
    onlyShowValid: true,
    type: 'file-tree-selection',
    message: 'Files:',
    validate(path) {
      const isFile = path.split('.').length > 1;
      return isFile ? util.matchBySuffix(path, '.test.js') : true;
    }
  }])
  .then(answers => {
    console.log(answers);
  })
  .catch(error => {
    console.log(error);
  });