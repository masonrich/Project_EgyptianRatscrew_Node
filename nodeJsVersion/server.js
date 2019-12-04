//TODO: REMINDER!!!!!!! Don't forget to pull files up a level in directory for deployment.


//modules
var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var game = require('./game');
var expressSession = require('express-session');
var numUsers = -1;  //start at 0
var people = { '1':{}, '0':{}}; //the people array storing index, name and turn
 var id = -1;


//express is a package that node uses
var server = express();
route(server);

//sets up to serve css and images

server.use(express.static(path.resolve(__dirname + '/assets')));


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
var names = ['Player1', 'Player2'];
var playerWhoSlapped = '0';

io.use(function (socket, next) {
   sessionMiddleware(socket.request, socket.request.res, next); 
});

io.on('connection', function (socket) {
    
    var addedUser = false;
    
    let playerIndex = -1;

    if (connections[0] === null) {
        playerIndex = 0;
        //console.log(playerIndex);
        connections[0] = '' + socket.id;

    } else if (connections[1] === null) {
        playerIndex = 1;
        connections[1] = '' + socket.id; 
        //console.log(playerIndex);
    }

    
    
    if (playerIndex === -1) return;
    

    
    //when the client emits 'add user', this listens and executes(might mess with the current prompt implementation -ac)
    socket.on('connected', (username) => {
        if (addedUser) return;
        
        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        if (numUsers === 0) {
            names[0] = username;
        } else if (numUsers === 1) {
            names[1] = username;
        }
        socket.emit('login', {
            numUsers: numUsers
        });
        //console.log("numUsers:" + numUsers);
        
        // echo globally (all clients) that a person has connected
        io.sockets.emit('user_joined', {    //change to a multidimensional array?
            username1: names[0],
            username2: names[1],
            numUsers: numUsers
        });
    });
    
    
    socket.on('slap', function(data) {
        //data comes from the browser
        
        //when emitting, 2nd paramater is data we send to client
        io.sockets.emit('slapped', "stuff");

    });
    
    socket.on('correctSlap', function(data) {
        //data comes from the browser
        
        //when emitting, 2nd paramater is data we send to client
        io.sockets.emit('correctSlapped', "stuff");

    });
    
    socket.on('toggleButton', (id) => {

        io.sockets.emit('enableButton')
    });
    
    socket.on('play-card', function(data) {
        //data comes from the browser
            io.sockets.emit('card-played', data);
    });
    
    //probably doesn't do anything - AC
    socket.on('gotName', function(data){
       io.sockets.emit('names', data); 
    });
    
    socket.on('start-game', function(data) {
        //data comes from the browser
        
        //when emitting, 2nd paramater is data we send to client
        io.sockets.emit('game-started');
    });
    
    socket.on('end-game', function(data) {
        //data comes from the browser
        game.EndGame();
        //when emitting, 2nd paramater is data we send to client
        io.sockets.emit('game-ended', data);
    });
    
    socket.on('pile-won', function () {
       
        io.sockets.emit('card-played');
    });
    
    //disconnects player
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            
            //echo globally that this client has left
            io.sockets.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
        //console.log('player ' + playerIndex + ' disconnected');
        connections[playerIndex] = null;
    });
    
    socket.on('playerWhoSlapped', (data) => {
        playerWhoSlapped = data;
        //console.log('who slapped: ' + playerWhoSlapped);
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
    
    /******************************/
    server.get('/rules', function(request, response){
        response.sendFile(path.resolve(__dirname + '/rules.html'));
    });
    /******************************/
    
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
        
       
        //console.log("node server slap. Value: " + playerWhoSlapped);
        if (playerWhoSlapped === connections[0]) {
            id = 0;
        } else if (playerWhoSlapped === connections[1]) {
            id = 1;
        }
        
        //console.log('id: ' + id);
            let temp = game.slap(id);
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
        let temp = game.GetGameOver();
        
        response.send(temp);
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
    
    server.get('/getName', function(request, response, next){
       //let name = game.getName();
        //let turn = game.playerTurn();
        
        response.send(JSON.stringify(names));
//        if (turn === '0')
    });
}

//JSON.stringify();     packages up an array for client side
//JSON.parse();         unpacks the array on client side