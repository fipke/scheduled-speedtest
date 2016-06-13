### Scheduled Speed Test

Using a package from 
https://github.com/ddsol/speedtest.net

A very simple node script to run and record speed test data.

### Installation

```
$ npm install
```

### Run

```
$ node .
```

### Help

```
$ node . -h
```

### Commands

```
// Help
$ node . -h

// Runs a default speed test of 5 minute intervals
$ node .

// Runs a once off speed test
$ node . -i once

// Sets and interval of 5 minutes
$ node . -i 5
```

### Log

This script records every speed test in "log" directory.