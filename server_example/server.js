// Load required modules
var https    = require("https");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module
var fs = require('fs');

var options = {
    key: fs.readFileSync('/etc/apache2/ssl/apache.key'),
    cert: fs.readFileSync('/etc/apache2/ssl/apache.crt'),
    requestCert: false   
}       

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

// Start Express http server on port 8080
var webServer = https.createServer(options,httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);
