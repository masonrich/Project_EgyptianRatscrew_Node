var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');

//express is a package that node uses
var server = express();
route(server);

//sets up to serve css and images

//server.use(express.static(path.resolve(__dirname + '/../assets')));

//express server based off node
var serverInstance = http.createServer(server).listen(1337);


function route(server) {
    server.get("/", function(reqeust, response, next) {
        //console.log('more poops');
        
        response.sendFile(path.resolve(__dirname + '/../index.html'));
        return next();
    });
}