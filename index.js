var fs = require('fs');
var speedTest = require('speedtest-net');
var schedule = require('node-schedule');

var j = schedule.scheduleJob('*/30 * * * *', function(){

  test = speedTest({maxTime: 5000});

  test.on('data', function(data) {
    writeData(data);
  });

  test.on('error', function(err) {
    console.error(err);
  });

});

var writeData = function(data){
  var fileContent = 'Speedtest done at: ' + getDateTime() + "\n\n";
  fileContent += JSON.stringify(data, null, 4);

  fs.writeFile("./tests/" + getDateTime(true) + ".txt", fileContent, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The data file was saved!");
  });

  var log = {
    'date': getDateTime(),
    'download': data.speeds.download,
    'upload': data.speeds.upload,
    'ping': data.server.ping
  };
  fs.writeFile("./log/" + getDateTime(true) + ".txt", JSON.stringify(log), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The log file was saved!");
  });

  console.log(JSON.stringify(log));

};

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