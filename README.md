# Splex

[![GitHub issues](https://img.shields.io/github/issues/Naereen/StrapDown.js.svg)](https://GitHub.com/Naereen/StrapDown.js/issues/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub commits](https://img.shields.io/github/commits-since/kodi/splex/v1.0.1.svg)](https://github.com/kodi/splex/commit/)
[![HitCount](http://hits.dwyl.io/kodi/splex.svg)](http://hits.dwyl.io/kodi/splex)


[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)


Need to watch 4 log files?

Tired of doing `tail -f log.file` in 4 terminal panels/tabs/windows?

Enter **Splex**

[![asciicast](https://asciinema.org/a/264129.svg)](https://asciinema.org/a/264129)

Splex is a streaming log multiplexer for node.

Pass in multiple files as aguments, to watch streaming in real time

Example commands

```
splex log/path/log.1 log/path/log.2
```


## Instalation

To install globally, do:
```
npm i -g splex
```