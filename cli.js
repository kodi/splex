#!/usr/bin/env node
const chalk = require('chalk');
const meow = require('meow');


const Tail = require('tail').Tail;

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


console.log('-------------------');
console.log('   Starting SpleX  ');
console.log('------ 🦈🦈 ------');

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


    
    
    listeners[f].on('eof', pos => console.log("Catched up to the last line") );
    listeners[f].on('error', err => console.log('Error: ', err));
    listeners[f].on('ready', fd => console.log('Ready to start on: ', fd));
    console.log(chalk.blue('Setting up listener for: ') + f);
});

// wait in loop, until someone presses ctrl-c
x = setInterval(() => {
}, 1500);
