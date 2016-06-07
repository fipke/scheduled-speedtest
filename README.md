### Speedtest every 30 min

Using a package from 
https://github.com/ddsol/speedtest.net

A very simple node script to run and record speed test data every 30 min.

### Installation

```
$ npm install
$ npm run start
```

### Log

This script records two data files, a detailed log to be located in the tests directory and a simple log that records download, upload and ping.

### Generate output

In order for index.html to function correctly, you should have a few log items in your log file.
Generate the output for your graph by running

```
$ npm run generate
```