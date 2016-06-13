'use strict';

var fs = require('fs');
var open = require('open');
var speedTest = require('speedtest-net');
var nodeSchedule = require('node-schedule');
var args = require('minimist')(process.argv.slice(2));

const INTERVAL_ONCE = 'once';
const defaults = {
  'interval': 5
};

var interval = defaults.interval;

/**
 * Returns the help instructions
 */
if ((args.h)||(args.help)) {
  console.log("\n");
  console.log("Internet speed test scheduler");
  console.log("Supply a more detailed report to your DSL provider");
  console.log("————————————————————————————————————————————————————————————————————————————————");
  console.log("node .                        Runs a default speed test of 5 minute intervals");
  console.log("node . -i "+INTERVAL_ONCE+"                Runs a once off speed test");
  console.log("node . -i 5                   Sets and interval of 5 minutes");
  console.log("\n");
  process.exit(0);
}

/**
 * Checks if -i flag value is valid
 */
if(args.i) {
  var validIntervals = [INTERVAL_ONCE, 2, 5, 10, 20, 30];

  if(validIntervals.indexOf(args.i) === -1){
    console.error('Valid intervals: ' + validIntervals.toString());
    process.exit(0);
  }

  interval = args.i;
}

/**
 * Starts scheduled speed test
 */
var runScheduler = function(interval) {
  open('index.html');
  fs.unlink("data.js", function(err) { });
  console.log('Scheduler starting. First test will run in ' + interval + 'minutes.');
  nodeSchedule.scheduleJob('*/'+interval+' * * * *', function () {
    runSpeedTest();
  });
};

/**
 * Starts once off speed test
 */
var runOnceOff = function() {
  console.log('Once off speed test starting...');
  runSpeedTest();
};

/**
 * Runs the speed test
 * Timeout: 5000seconds
 */
var runSpeedTest = function() {
  var test = speedTest({maxTime: 5000});

  test.on('data', function (data) {
    writeData(data);
  });

  test.on('error', function (err) {
    console.error(err);
  });
};

/**
 * Writes and returns the speed test results
 * @param data
 */
var writeData = function(data){

  data.date = getDateTime();

  fs.mkdir("./logs", function(err){ });

  fs.writeFile("./logs/" + getDateTime(true) + ".txt", JSON.stringify(data, null, 4), function(err) {
    if (err) throw err;
  });

  fs.readFile("data.js", function (err, fileData) {
    if (err) {
      fileData = "var data = [];\n";
    }

    fs.writeFile("data.js", fileData + "data.push(" + JSON.stringify(data) + ");\n", function (err) {
      if (err) throw err;
    });
  });

  console.log("\n");
  console.log('Date: ' + getDateTime());
  console.log('Ping: ' + data.server.ping);
  console.log('Download Speed: ' + data.speeds.download);
  console.log('Upload Speed: ' + data.speeds.upload);
  console.log("\n");
};

/**
 * Returns the date and time in a proper format
 *
 * @param isFileName
 * @returns {*}
 */
function getDateTime(isFileName) {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  if(isFileName) {
    return year + month + day + hour + min + sec;
  }else{
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
  }
}

/**
 * Runs the script
 */
if(interval === INTERVAL_ONCE) runOnceOff(); else runScheduler(interval);