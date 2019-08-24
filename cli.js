#!/usr/bin/env node
const Tail = require('tail-file');
const chalk = require('chalk');
const meow = require('meow');


// CLI Stuff
const cli = meow(`
Uage: test
`, {
    flags: {
        table: {
            type: 'boolean',
            alias: 't'
        }    
    }
});

const termSize = process.stdout.columns;


let listeners = {};

let colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'magenta',
    'cyan',
]

let filenames = cli.input;


// create index of fileName -> color
let colorIdx = {};
filenames.forEach((f, idx) => {
    let cIdx = idx % colors.length;
    colorIdx[f] = colors[cIdx];
});


filenames.forEach((f) => {
    listeners[f] = new Tail(f);
    listeners[f].on('line', (l) => {
        let color = colorIdx[f];
        if(cli.flags.t) {
            
            const logString = `> ${f}: | ${l} `;
            console.log(chalk[color](`> ${f}: `) + chalk.green('| ') +  chalk.white(`${l}`));
            console.log(chalk.green('-'.repeat(termSize)));
        } else {

            console.log(chalk[color](`> ${f}: `) +  chalk.white(`${l}`));
        }
    });

    listeners[f].start();
});


console.log('-------------------');
console.log('   Starting SpleX  ');
console.log('------ 🦈🦈 ------');

// wait in loop, until someone presses ctrl-c
x = setInterval(() => {
}, 1500);
