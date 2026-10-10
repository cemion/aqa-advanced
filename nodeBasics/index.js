import chalk from 'chalk';

console.log(chalk.blue('Hello from Node.js!'));
console.log(chalk.green.bold('Chalk is installed and working'));
console.log(chalk.red.underline('Error-like red text'));
console.log(chalk.yellow.bgBlack(' Yellow on black '));
console.log(`${chalk.magenta('Mixed')} ${chalk.cyan('colors')} ${chalk.white.inverse('in one line')}`);
