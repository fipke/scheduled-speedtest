var fs = require('fs');

fs.readdir('./log', function(err, files){

  var download = [];
  var upload = [];
  var ping = [];
  var all = [];

  for(var i = 0; i < files.length; i++){

    var obj = JSON.parse(fs.readFileSync('./log/' + files[i], 'utf8'));

    var downloadObj = {};
    downloadObj.date = obj.date;
    downloadObj.value = obj.download;
    download.push(downloadObj);

    var uploadObj = {};
    uploadObj.date = obj.date;
    uploadObj.value = obj.upload;
    upload.push(uploadObj);

    var pingObj = {};
    pingObj.date = obj.date;
    pingObj.value = obj.ping;
    ping.push(pingObj);

    var allObj = {};
    allObj.date = obj.date;
    allObj.download = obj.download;
    allObj.upload = obj.upload;
    allObj.ping = obj.ping;
    all.push(allObj);
  }

  fs.writeFile("./output/downloadData.js", 'var downloadData = ' + JSON.stringify(download) + ';', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The download file was saved!");
  });

  fs.writeFile("./output/uploadData.js", 'var uploadData = ' + JSON.stringify(upload) + ';', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The upload file was saved!");
  });

  fs.writeFile("./output/pingData.js", 'var pingData = ' + JSON.stringify(ping) + ';', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The ping file was saved!");
  });

  fs.writeFile("./output/allData.json", JSON.stringify(all), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("All date json file was saved!");
  });

});