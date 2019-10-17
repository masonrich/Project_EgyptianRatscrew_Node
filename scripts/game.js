//window.onload();


var deck, player1Deck, player2Deck, pile, playerTurn, player1Name, player2Name, pileCurrentlySlappable;

/*
deck: array of all cards
player1Deck: array of player one cards
player2Deck: array of player two cards
pile: array of cards in current pile
playerTurn: counter for player turn
*/


//0 is player1 and 1 is player 2. We toggle 0 and 1 to see who's turn it is.


function BuildDeck() {
     deck = [ "AceSpades", "2Spades", "3Spades", "4Spades", "5Spades", "6Spades", "7Spades",            "8Spades", "9Spades", "10Spades", "JackSpades", "QueenSpades", "KingSpades",
            "AceClubs", "2Clubs", "3Clubs", "4Clubs", "5Clubs", "6Clubs", "7Clubs", "8Clubs", "9Clubs", "10Clubs", "JackClubs", "QueenClubs", "KingClubs",
            "AceHearts", "2Hearts", "3Hearts", "4Hearts", "5Hearts", "6Hearts", "7Hearts", "8Hearts", "9Hearts", "10Hearts", "JackHearts", "QueenHearts", "KingHearts",
            "AceDiamonds", "2Diamonds", "3Diamonds", "4Diamonds", "5Diamonds", "6Diamonds", "7Diamonds", "8Diamonds", "9Diamonds", "10Diamonds", "JackDiamonds", "QueenDiamonds", "KingDiamonds"];
}

//find first player at game start
function whoFirst(){
    var random = Math.random();
    if(random < 0.5){
        playerTurn = 0;
    }
    else{
        playerTurn = 1;
    }
	
	console.log(random);
}

function ShuffleDeck() {
       
    deck.sort(function() {
      return .5 - Math.random();
    });
    
    //console.log(deck);
}


function DealDeck() {
	player1Deck = new Array();
	player2Deck = new Array();
	
	for (let i = 0; i < 26; i++) {
		player1Deck.push(deck[deck.length - 1]);
		deck.pop();
	}
	
	for (let i = 0; i < 26; i++) {
	player2Deck.push(deck[deck.length - 1]);
	deck.pop();
	}
	
	console.log(player1Deck);
	console.log(player2Deck);
}

function StartGame() {
	BuildDeck();
	ShuffleDeck();
	DealDeck();
	
	pile = new Array();
	whoFirst();
	console.log(playerTurn);
}

function PlayCard() {
	if (playerTurn == 0) {	
	
		if (player1Deck.length == 0) {
			//game over
			return;
		}
		
		pile.splice(0, 0, player1Deck[player1Deck.length - 1]);
		player1Deck.pop();
		playerTurn = 1;
		
	} else {
		
		if (player2Deck.length == 0) {
			//game over
			return;
		}
		
		pile.splice(0, 0, player2Deck[player2Deck.length - 1]);
		player2Deck.pop();
		playerTurn = 0;
		
	}
	
	console.log(player1Deck);
	console.log(player2Deck);
	console.log(pile);
}