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

// Sanity checks
if (cli.input.length === 0) {
  console.log(chalk.red('Error:'), 'No files specified.');
  console.log(
    chalk.yellow('Usage example:'),
    'splex [options] file1 file2 file3...'
  );
  cli.showHelp(2);
}

const termSize = process.stdout.columns;
let filenames = cli.input;
let listeners = {};
let colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan'];

// Provide custom colors
if (cli.flags.c) {
  colors = cli.flags.c.split(',');
}

// Create index of fileName -> color
let colorIdx = {};
filenames.forEach((f, idx) => {
  let cIdx = idx % colors.length;
  colorIdx[f] = colors[cIdx];
});

// -------- START SPLEX -----------
console.log('-------------------');
console.log('  Starting SpleX   ');
console.log('----- 🦈  🦈 ------');
// Start tail listeners for each file provided
filenames.forEach(f => {
  listeners[f] = new Tail(f);
  listeners[f].on('line', l => {
    let color = colorIdx[f];
    switch (optionsSum) {
      case 1:
        // Tables
        colorPrintTable(color, f, l);
        break;
      case 2:
        // Custom colors provided, print default
        colorPrint(color, f, l);
        break;
      case 3:
        // Custom colors + table
        colorPrintTable(color, f, l);
        break;
      case 4:
        // Momno - no tables
        monoPrint(f, l);
        break;
      case 5:
        // Mono - with tables
        monoPrintTable(f, l);
        break;
      case 6:
        // Mono + custom colors, invalid combination,
        // just print mono
        monoPrint(f, l);
        break;
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
  console.log(chalk[colorIdx[f]]('Setting up listener for: ') + f);
});

// Color print line, with table flag for tagle format
let colorPrint = function (color, file, line) {
  console.log(chalk[color](`> ${file}: `) + chalk.white(`${line}`));
};

let colorPrintTable = function (color, file, line) {
  console.log(chalk[color](`> ${file}: `) + chalk.green('| ') + chalk.white(`${line}`));
  console.log(chalk.green('-'.repeat(termSize)));
};

// Mono print line with flag for table format
let monoPrint = function (file, line) {
  console.log(`> ${file}: ${line}`);
};

// Mono print line with flag for table format
let monoPrintTable = function (file, line) {
  console.log(`> ${file}: | ${line}`);
  console.log('-'.repeat(termSize));
};

// Wait in loop, until someone presses ctrl-c
const x = setInterval(() => {}, 1000);
