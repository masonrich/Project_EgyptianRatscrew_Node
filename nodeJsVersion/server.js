//TODO: REMINDER!!!!!!! Don't forget to pull files up a level in directory for deployment.



//modules
var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var game = require('./game');

var Redis = require('ioredis');
var redis = new Redis();


//express is a package that node uses
var server = express();
route(server);

//sets up to serve css and images

server.use(express.static(path.resolve(__dirname + '/assets')));
//var appDir = path.dirname(require.)

//express server based off node
var serverInstance = http.createServer(server).listen(process.env.PORT || 1337);

var io = require('socket.io')(serverInstance);

//Connect to io and use the sockets to "create" player when they connect the server. delete upon disconnection



//var io = require('../..')(server);
var connections = [null, null];

io.on('connection', function (socket) {
    let playerIndex = -1;
    for (var i in connections) {
        if (connections[i] == null) {
            playerIndex = i;
        }
    }
    
    console.log(connections);
    
    socket.emit('player-number', playerIndex);
    
    console.log(playerIndex);
    
    if (playerIndex == -1) return;
    
    redis.on("message", function(channel, message) {
        console.log("mew message in queue "+ message + "channel");
        socket.emit(channel, message);
    });
    
    socket.on('disconnect', () => {
        console.log('player ' + playerIndex + ' disconnected');
        connections[playerIndex] = null;
    });
});


function route(server) {    
    server.get('/', function(request, response, next) {
        
    response.sendFile(path.resolve(__dirname + '/index.html'));
        //return next();
    });
    
    server.get('/getGame', function(request, response, next) {
        
        let temp = game.StartGame();
        
       response.send('' + temp); 
    });
    
    server.get('/playCard', function(request, response, next) {
        
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
    
//    server.get('/getWait', function(request, response, next) {
//       game.ToggleGameStart();
//        
//    });
    
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
    });
    
    server.get('/ClearPile', function(request, response, next){
        let temp = game.ClearPile();
        
        response.send(temp);
    });
         
    server.get('/emptyPile', function(request, response, next){
        let temp = game.emptyPile();
        
        response.send(temp);
    });
    
    server.get('/getCount', function(request, response, next){
        let temp = game.GetCount();
        
        response.send('' + temp);
    });
    
    server.get('/end', function(request, response, next){
            game.EndGame();
    });
    
    server.get('/gameStart', function(request, response, next){
        let temp = game.getGameStart();
        
        response.send(temp);
    });
    
    server.get('/updatePlayerOneScore', function(request, response, next){
        let temp = game.updatePlayerOneScore();
        
        response.send(temp);
    });
    
    server.get('/updatePlayerTwoScore', function(request, response, next){
        let temp = game.updatePlayerTwoScore();
        
        response.send(temp);
    });
    
    server.get('/gameOver', function(request, response, next) {
       let temp = game.GetGameOver();
            
        response.send(temp);
    });
}

//JSON.stringify();     packages up an array for client side
//JSON.parse();         unpacks the array on client side