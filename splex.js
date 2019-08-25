#!/usr/bin/env node
const chalk = require("chalk");
const meow = require("meow");
const Tail = require("tail").Tail;

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
      table: { type: "boolean", alias: "t" },
      colors: { type: "string", alias: "c" },
      monochrome: { type: "boolean", alias: "m" }
    }
  }
);
// sanity checks
if (cli.input.length === 0) {
  console.log(chalk.red("Error:"), "No files specified.");
  console.log(
    chalk.yellow("Usage example:"),
    "splex [options] file1 file2 file3..."
  );
  cli.showHelp(2);
}
const termSize = process.stdout.columns;
let filenames = cli.input;
let listeners = {};
let colors = ["red", "green", "blue", "yellow", "magenta", "cyan"];
// provide custom colors
if (cli.flags.c) {
  colors = cli.flags.c.split(",");
}
// create index of fileName -> color
let colorIdx = {};
filenames.forEach((f, idx) => {
  let cIdx = idx % colors.length;
  colorIdx[f] = colors[cIdx];
});
// -------- START SPLEX -----------
console.log("-------------------");
console.log("  Starting SpleX   ");
console.log("----- 🦈  🦈 ------");
// Start tail listeners for each file provided
filenames.forEach(f => {
  listeners[f] = new Tail(f);
  listeners[f].on("line", l => {
    let color = colorIdx[f];
    if (cli.flags.t && !cli.flags.m) {
      console.log(
        chalk[color](`> ${f}: `) + chalk.green("| ") + chalk.white(`${l}`)
      );
      console.log(chalk.green("-".repeat(termSize)));
    } else if (cli.flags.t && cli.flags.m) {
      console.log(`> ${f}: | ${l}`);
      console.log("-".repeat(termSize));
    } else if (cli.flags.m) {
      console.log(`> ${f}: ${l}`);
    } else {
      console.log(chalk[color](`> ${f}: `) + chalk.white(`${l}`));
    }
  });
  listeners[f].on("error", err => console.log("Error: ", err));
  console.log(chalk[colorIdx[f]]("Setting up listener for: ") + f);
});
// wait in loop, until someone presses ctrl-c
x = setInterval(() => {}, 1000);
