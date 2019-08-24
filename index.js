const Tail = require('tail-file');
const chalk = require('chalk');


let listeners = {};

let colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'magenta',
    'cyan',
]

let filenames = [
    'logs/log-1.log',
    'logs/log-2.log',
    'logs/log-3.log',
    'logs/log-0.log',
];


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
        console.log(chalk[color](`> ${f}: `) +  chalk.white(`${l}`));
    });

    listeners[f].start();
});


console.log('Starting Sharky');
console.log('------ 🦈🦈 ------');

// wait in loop, until someone presses ctrl-c
x = setInterval(() => {
}, 1500);
