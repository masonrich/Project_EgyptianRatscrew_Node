var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var game = require('./game'); 

//express is a package that node uses
var server = express();
route(server);

//sets up to serve css and images

server.use(express.static(path.resolve(__dirname + '/../assets')));

//express server based off node
var serverInstance = http.createServer(server).listen(1337);


function route(server) {
    server.get('/', function(reqeust, response, next) {
        
        response.sendFile(path.resolve(__dirname + '/../index.html'));
        //return next();
    });
    
    server.get('/getGame', function(reqeust, response, next) {
        
        let temp = game.StartGame();
        
       response.send('' + temp); 
    });
    
    server.get('/playCard', function(reqeust, response, next) {
        
        let temp = game.PlayCard();
        
       response.send('' + temp); 
    });
    
    server.get('/hasPreviousFaceCard', function(request, response, next) {
       let temp = game.HasPreviousFaceCard();
        
        response.send(temp);
    });
    
    server.get('/getWait', function(request, response, next) {
       let temp = game.GetWait();
        
        response.send(temp);
    });
    
    server.get('/getWait', function(request, response, next) {
       game.ToggleGameStart();
        
    });
    
    server.get('/displayTop5', function(request, response, next) {
       let myPile = game.DisplayTop5();
        
         response.send(myPile);
    });
    
    
    server.get('/slap', function(request, response, next) {
            let temp = game.slap();
            response.send(temp);
    });
    
    
    server.get('/IsPileSlappable', function(request, response, next){
        let temp = game.IsPileSlappable();
        
        response.send(temp);
    })
               
}

//JSON.stringify();     packages up an array for client side
//JSON.parse();         unpacks the array on client side