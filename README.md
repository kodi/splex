# Splex

[![GitHub issues](https://img.shields.io/github/issues/Naereen/StrapDown.js.svg)](https://GitHub.com/Naereen/StrapDown.js/issues/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub commits](https://img.shields.io/github/commits-since/kodi/splex/v1.0.1.svg)](https://github.com/kodi/splex/commit/)
[![HitCount](http://hits.dwyl.io/kodi/splex.svg)](http://hits.dwyl.io/kodi/splex)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)


[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Instalation

To install globally, do:
```
npm i -g splex
```

## What is Splex
Need to watch 4 log files?

Tired of doing `tail -f log.file` in 4 terminal panels/tabs/windows?

Enter **Splex**

[![asciicast](https://asciinema.org/a/264129.svg)](https://asciinema.org/a/264129)

Splex is a streaming log multiplexer for node.

Pass in multiple files as aguments, and watch them stream all at once in a single window, nicely color coded by log file, or even separated in table-like format for easier reading.


## Example commands

Basic usage

```
splex logs/log-0.log logs/path/log.1 logs/path/log.2
```
![custom colors](img/basic.png)

To have a table-like interface, add `-t` flag:

```
splex -t logs/log-0.log logs/log-1.log logs/log-2.log
```
![custom colors](img/table.png)

To specify custom colors, eg. alternating yellow and blue:
```
splex -t -c yellow,blue logs/log-0.log logs/log-1.log logs/log-2.log logs/log-3.log
```

![custom colors](img/custom_colors.png)


Monochrome mode is activated by adding `-m`  flag:

```
splex -tm logs/log-0.log logs/log-1.log logs/log-2.log
```


## .splexrc.json - define list of files per folder
 
typing `splex file_1 file_2 file_X` and then `log_2  log_3` in other folder can be tedious and quickly becomes painful and repetitive job.

In order to make your life easier you can create `.splexrc.json` file in folder, with path relative to it, then `cd` into that folder and just type `splex`

Here is example content of config file:

```
{
  "files": [
	  "logs/log-0.log",
	  "logs/log-1.log",
	  "logs/log-2.log",
	  "logs/log-3.log"
  ]	
}
```
