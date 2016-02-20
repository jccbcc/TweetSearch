console.log('************ Entered mule model ***********');
var http = require('http');
var request = require('request');


var options = {
  host: '54.191.254.205',
  port: 8081,
  path: '/twitter/search?query=Clemson',
  method: 'GET'
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.STATUSCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });

}).end();