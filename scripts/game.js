//window.onload();


var deck, player1Deck, player2Deck, pile, playerTurn, player1Name, player2Name, pileCurrentlySlappable;

/*
deck: array of all cards
player1Deck: array of player one cards
player2Deck: array of player two cards
pile: array of cards in current pile
playerTurn: counter for player turn
*/

//boolean flag for face cards
var faceCard = false;

//used to track number of cards needed to play when face card played
var count;

//0 is player1 and 1 is player 2. We toggle 0 and 1 to see who's turn it is.


function BuildDeck() {
     deck = [ "AceSpades", "2Spades", "3Spades", "4Spades", "5Spades", "6Spades", "7Spades", "8Spades", "9Spades", "10Spades", "JackSpades", "QueenSpades", "KingSpades",
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
			//TODO: Accomplish the below comment
			//game over logic
			return;
		}
		
		pile.splice(0, 0, player1Deck[player1Deck.length - 1]);
		player1Deck.pop();
		playerTurn = 1;
		
	} else {
		
		if (player2Deck.length == 0) {
			//TODO: Accomplish the below comment
			//game over logic
			return;
		}
		
		pile.splice(0, 0, player2Deck[player2Deck.length - 1]);
		player2Deck.pop();
		playerTurn = 0;
		
	}
	
	IsPileSlappable();
	
	//console.log(player1Deck);
	//console.log(player2Deck);
	//console.log(pile);
}

function IsPileSlappable() {
	if (pile.length < 2) {
		pileCurrentlySlappable = false;
	} else {
		if (pile[0].substring(0, 1) == pile[1].substring(0, 1)) {
			pileCurrentlySlappable = true;
		} else {
			pileCurrentlySlappable = false;
		}
	}
}

function slap() {
    if (pile.length == 0) {
		return;
	}
		
	if (pileCurrentlySlappable) {
		//TODO: Accomplish the below 6 lines
		//Need async to determine who slapped.
		//if (player1Slapped) {
		//	playerTurn = 0;
		//} else {
		//	playerTurn = 1;
		//}
		
		//thie represents # of cards in pile at time of slap.
		let length = pile.length;
		
		if (playerTurn == 0) {
			for (let i = 0; i < length; i++) {
				if (pile.length == 0) {
					break;
				}
				
				player1Deck.splice(0, 0, pile);
				pile.pop();
			}
		} else {
			for (let i = 0; i < length; i++) {
				if (pile.length == 0) {
					break;
				}
				
				player2Deck.splice(0, 0, pile);
				pile.pop();
			}
		}
		
	} else {
		let whoSlapped;
		//TODO: Accomplish the below comment
		//Need asnyc to determine which player incorrectly slapped.
		if (player1Slapped) {
			whoSlapped = 0;
		} else {
			whoSlapped = 1;
		}
		
		//current player plays 2 cards from bottom of deck to bottom of pile
		if (whoSlapped = 0) {
			pile.splice(pile.length - 1, 0, player1Deck[0]);
			pile.splice(pile.length - 1, 0, player1Deck[0]);
		} else {
			pile.splice(pile.length - 1, 0, player2Deck[0]);
			pile.splice(pile.length - 1, 0, player2Deck[0]);
		}
		
		//check to see if this triggers end game condition
		if (player1Deck.length == 0) {
			//TODO: Accomplish the below comment
			//player 2 wins and game ends
		} else if (player2Deck.length == 0) {
			//TODO: Accomplish the below comment
			//player 1 wins and game ends
		}
	}
}


//used to check if card is face(set false when count is 0)
function isCardFace(){
    if(deck.length - 1 === "A" || deck.length - 1 === "J" || deck.length - 1 === "Q" || deck.length - 1 === "K"){
        faceCard = true;
    }
}

//function if card is ace
function isAce(){
    //count 4
    count = 4;
    faceCard = true;
    //TODO: insert faceLogic method    
}

//function if card is jack
function isJack(){
    //count 1
    count = 1;
    faceCard = true;
    //TODO: insert faceLogic method    
}

//function if card is queen
function isQueen(){
    //count 2
    count = 2;
    faceCard = true;
    //TODO: insert faceLogic method
}

//function if card is king
function isKing(){
    //count 3
    count = 3;
    faceCard = true;
    //TODO: insert faceLogic method
}

function faceLogic() {
    //TODO: right out faceLogic method
}
