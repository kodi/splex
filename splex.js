#!/usr/bin/env node
const chalk = require('chalk');
const meow = require('meow');
const Tail = require('tail').Tail;

// CLI Stuff
const cli = meow(
  `
------------------

S P L E X

------------------

Usage: 
$ splex [options] file1 file 2 fileX

Options:
--table -t        print as table rows
--colors -c       specify custom colors as: color1, color2
--monochrome -m   monochrome mode
`,
  {
    flags: {
      table: {type: 'boolean', alias: 't'},
      colors: {type: 'string', alias: 'c'},
      monochrome: {type: 'boolean', alias: 'm'}
    }
  }
);

// Sanity checks
if (cli.input.length === 0) {
  console.log(chalk.red('Error:'), 'No files specified.');
  console.log(
    chalk.yellow('Usage example:'),
    'splex [options] file1 file2 file3...'
  );
  cli.showHelp(2);
}

// Options handling
const optionsMap = {
  t: 1,
  c: 2,
  m: 4
};

let optionsSum = 0;
['t', 'c', 'm'].forEach(flag => {
  if (cli.flags[flag] === true || (typeof cli.flags[flag] === 'string' && cli.flags[flag] !== '')) {
    optionsSum += optionsMap[flag];
  }
});

let appOptions = {
  term: {
    size: process.stdout.columns,
    line: '-'.repeat(process.stdout.columns)
  },
  colors: ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan'],
  colorIdx: {}
};

let filenames = cli.input;
let listeners = {};

// Provide custom colors
if (cli.flags.c) {
  appOptions.colors = cli.flags.c.split(',');
}

// Create index of fileName -> color
filenames.forEach((f, idx) => {
  let cIdx = idx % appOptions.colors.length;
  appOptions.colorIdx[f] = appOptions.colors[cIdx];
});

// -------- START SPLEX -----------
console.log('-------------------');
console.log('  Starting SpleX   ');
console.log('----- 🦈  🦈 ------');
// Start tail listeners for each file provided
filenames.forEach(f => {
  listeners[f] = new Tail(f);
  listeners[f].on('line', l => {
    let color = appOptions.colorIdx[f];
    switch (optionsSum) {
      case 1: // Tables, same as 3
      case 3:
        // Custom colors + table
        colorPrintTable(color, f, l);
        break;
      case 2: // Custom colors provided, print default
        colorPrint(color, f, l);
        break;
      case 4: // Mono - no tables, same as 6
      case 6:
        // Mono + custom colors, invalid combination,
        // just print mono
        monoPrint(f, l);
        break;
      case 5: // Mono - with tables, same as 7
      case 7:
        // Mono + table + custom colors
        // invalid combination, print mono table
        monoPrintTable(f, l);
        break;
      default:
        colorPrint(color, f, l);
        break;
    }
  });

  listeners[f].on('error', err => console.log('Error: ', err));
  console.log(chalk[appOptions.colorIdx[f]]('Setting up listener for: ') + f);
});

// Color print line, with table flag for tagle format
let colorPrint = function (color, file, line) {
  console.log(chalk[color](`> ${file}: `) + chalk.white(`${line}`));
};

let colorPrintTable = function (color, file, line) {
  console.log(chalk[color](`> ${file}: `) + chalk.green('| ') + chalk.white(`${line}`));
  console.log(chalk.green(appOptions.term.line));
};

// Mono print line with flag for table format
let monoPrint = function (file, line) {
  console.log(`> ${file}: ${line}`);
};

// Mono print line with flag for table format
let monoPrintTable = function (file, line) {
  console.log(`> ${file}: | ${line}`);
  console.log(appOptions.term.line);
};

// Stuff that need to be re-calculated
// on term re-size
let handleChange = function () {
  appOptions.term.size = process.stdout.columns;
  appOptions.term.line = '-'.repeat(process.stdout.columns);
};

// Wait in loop, until someone presses ctrl-c
setInterval(() => {
  handleChange();
}, 1000);
