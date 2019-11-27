//TODO: REMINDER!!!!!!! Don't forget to pull files up a level in directory for deployment.



//modules
var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var game = require('./game');
var expressSession = require('express-session');

//var Redis = require('ioredis');
//var redis = new Redis();


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

var sessionMiddleware = expressSession ({
    resave: true,
    saveUninitialized: true,
    secret: { maxAge: 1000 * 60 * 60 * 24 }
});


//var io = require('../..')(server);
var connections = [null, null];

io.use(function (socket, next) {
   sessionMiddleware(socket.request, socket.request.res, next); 
});

io.on('connection', function (socket) {
    
    var addedUser = false;
    
    let playerIndex = -1;

    if (connections[0] === null) {
        playerIndex = 0;
        connections[0] = '' + socket.id;

    } else if (connections[1] === null) {
        playerIndex = 1;
        connections[1] = '' + socket.id;     
    }
//    for (let i = 0; i < connections.length; i++) {
//        if (connections[i] == null) {
//            playerIndex = i;
//            connections[i] = socket.id;
//        }
//    }
    
    //console.log(connections);
    
    socket.emit('player-number', playerIndex);
    
    //needs to be here, SUPER IMPORTANT
    //connections[playerIndex] = socket;
    
    console.log(playerIndex);
    console.log("user 1: " + connections[0] + " User 2: " + connections[1]);
    
    if (playerIndex === -1) return;
    

   // redis.on("message", function(channel, message) {
    //    console.log("mew message in queue "+ message + "channel");
    //    socket.emit(channel, message);
    //});

    
    //when the client emits 'add user', this listens and executes
    socket.on('connected', (username) => {
        if (addedUser) return;
        
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
    
    
    socket.on('slap', function(data) {
        //data comes from the browser
        
        //when emitting, 2nd paramater is data we send to client
        socket.emit('slapped', "stuff");
    });
    
    socket.on('toggleButton', (id) => {
        console.log('id                           ' + id);
        console.log('connections at 0: ' + connections[0]);
        console.log('connections at 1: ' + connections[1]);
//       if (id === connections[0]) {
//           console.log("enable 1");
//           socket.to(connections[1]).emit('enableButton');
//       } else if (id === connections[1]) {
//           console.log("enable 0");
//           socket.to(connections[0]).emit('enableButton');
//       }
        io.sockets.emit('enableButton')
    });
    
    socket.on('play-card', function(data) {
        //data comes from the browser
            io.sockets.emit('card-played', data);
    });
    
    socket.on('start-game', function(data) {
        //data comes from the browser
        
        //when emitting, 2nd paramater is data we send to client
        io.sockets.emit('game-started');
    });
    
    socket.on('end-game', function(data) {
        //data comes from the browser
        
        //when emitting, 2nd paramater is data we send to client
        socket.emit('game-ended', "stuff");
    });
    
    socket.on('pile-won', function () {
       
        io.sockets.emit('card-played');
    });
    
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            
            //echo globally that this client has left
            socket.broadcast.emi('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
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
        //game.ToggleGameStart();
       let temp = game.GetWait();
        
        response.send(temp);
        
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
    
    server.get('/playerTurn', function(request, response, next) {
       let turn = game.playerTurn();
           
        response.send(turn);
    });
    
    server.get('/playerTurnSocket', function(request, response, next) {
       let turn = game.playerTurn();
        
        if (turn === '0') {
            turn = connections[0];
        } else if (turn === '1') {
            turn = connections[1];
        }
           
        response.send(turn);
    });
}

//JSON.stringify();     packages up an array for client side
//JSON.parse();         unpacks the array on client side