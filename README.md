# Splex

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