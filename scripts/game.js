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

//store first letter of card - AC
var firstLetter;

//stores the current player, used in faceLogic
var currentPlayer;


//0 is player1 and 1 is player 2. We toggle 0 and 1 to see who's turn it is.


function BuildDeck() {
     deck = [ "AceSpades", "2Spades", "3Spades", "4Spades", "5Spades", "6Spades", "7Spades", "8Spades", "9Spades", "10Spades", "JackSpades", "QueenSpades", "KingSpades",
            "AceClubs", "2Clubs", "3Clubs", "4Clubs", "5Clubs", "6Clubs", "7Clubs", "8Clubs", "9Clubs", "10Clubs", "JackClubs", "QueenClubs", "KingClubs",
            "AceHearts", "2Hearts", "3Hearts", "4Hearts", "5Hearts", "6Hearts", "7Hearts", "8Hearts", "9Hearts", "10Hearts", "JackHearts", "QueenHearts", "KingHearts",
            "AceDiamonds", "2Diamonds", "3Diamonds", "4Diamonds", "5Diamonds", "6Diamonds", "7Diamonds", "8Diamonds", "9Diamonds", "10Diamonds", "JackDiamonds", "QueenDiamonds", "KingDiamonds"];
}

//find first player at game start
function whoFirst() {
    var random = Math.random();
    if (random < 0.5) {
        playerTurn = 0;
    } else {
        playerTurn = 1;
    }
	
	console.log(random);
}

function ShuffleDeck() {
       
    deck.sort(function() {
        return (0.5 - Math.random());
    });
    
    //console.log(deck);
}


function DealDeck() {
	player1Deck = new Array();
	player2Deck = new Array();
	
	for (var i = 0; i < 26; i++) {
		player1Deck.push(deck[deck.length - 1]);
		deck.pop();
	}
	
	for (var i = 0; i < 26; i++) {
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
	if (playerTurn === 0) {    //added additional equals - AC
	
		if (player1Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//game over logic
			return;
		}
		
		pile.splice(0, 0, player1Deck[player1Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player1Deck.pop();
        /*******************************/
        if(count > 0){
            playerTurn = 0;
            count--;
            if(count === 0 && /*mikes bool variables*/){
                for (var i = 0; i < pile.length; i++) {
				if (pile.length === 0) {    //added additional equals - AC

					break;
				}
				
				player2Deck.splice(0, 0, pile);
				pile.pop();
			}
        } else {
		  playerTurn = 1; //mikes original code
        }
        
		
	} else {
		
		if (player2Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//game over logic
			return;
		}
		
		pile.splice(0, 0, player2Deck[player2Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player2Deck.pop();
        /*******************************/
        if(count > 0){
            playerTurn = 1;
            count--;
            if(count === 0 && /*mikes bool variable*/){
               for (var i = 0; i < pile.length; i++) {
				if (pile.length === 0) {    //added additional equals - AC

					break;
				}
				
				player1Deck.splice(0, 0, pile);
				pile.pop();
			}
            
        } else {
		playerTurn = 0; //mikes original code
        }
		
	}
	
    isCardFace(); //check for face card on card play
	IsPileSlappable();
	
	console.log(player1Deck);
	console.log(player2Deck);
	console.log(pile);
}

function IsPileSlappable() {
	if (pile.length < 2) {
		pileCurrentlySlappable = false;
	} else {
		if (pile[0].substring(0, 1) === pile[1].substring(0, 1)) {    //added additional equals - AC
			pileCurrentlySlappable = true;
		} else {
			pileCurrentlySlappable = false;
		}
	}
}

/*************mismatch parentheses**********************/

function slap() {
    if (pile.length === 0) {    //added additional equals - AC
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
		var length = pile.length;
		
		//if (playerTurn === 0) {    //added additional equals - AC
		//	for (var i = 0; i < length; i++) {
//				if (pile.length === 0) {    //added additional equals - AC
		if (playerTurn === 0) {             //added additional equals - AC
			for (var i = 0; i < length; i++) {
				if (pile.length === 0) {    //added additional equals - AC

					break;
				}
				
				player1Deck.splice(0, 0, pile);
				pile.pop();
			}
		} else {

		//	for (var i = 0; i < length; i++) {
		//		if (pile.length === 0) {    //added additional equals - AC
			for (var i = 0; i < length; i++) {
				if (pile.length === 0) {    //added additional equals - AC
					break;
				}
				
				player2Deck.splice(0, 0, pile);
				pile.pop();
			}
		}
		
	} else {
		var whoSlapped;       //let to var - ac
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
            player1Deck.shift();
			pile.splice(pile.length - 1, 0, player1Deck[0]);
            player1Deck.shift();
		} else {
			pile.splice(pile.length - 1, 0, player2Deck[0]);
            player2Deck.shift();
			pile.splice(pile.length - 1, 0, player2Deck[0]);
            player2Deck.shift();
		}
		
		//check to see if this triggers end game condition
		if (player1Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//player 2 wins and game ends
		} else if (player2Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//player 1 wins and game ends
		}
	}
}




//call before face logic//
//used to check if card is face(set false when count is 0)
function isCardFace(){
    console.log("player turn: " + playerTurn);
    console.log("your card: " + pile[0]); //used for testing
    var card = pile[0];
    
    console.log("first letter: " + card.charAt(0)) //used for testing
    
    firstLetter = card.charAt(0);
    
    if(firstLetter === 'K' || firstLetter === 'Q'|| firstLetter === 'J' || firstLetter === 'A'){
        faceCard = true;
        currentPlayer = playerTurn;
        console.log("is face card: " + faceCard); //used for testing
            switch(firstLetter){
                case 'A':
                    isAce();
                    break;
                case 'J':
                    isJack();
                    break;
                case 'Q':
                    isQueen();
                    break;
                case 'K':
                    isKing();
                    break;
                default:
                    console.log("no match");
            }
    }
}

//function if card is ace
function isAce(){
    //count 4
    count = 4;
    faceCard = true;  
}

//function if card is jack
function isJack(){
    //count 1
    count = 1;
    faceCard = true;   
}

//function if card is queen
function isQueen(){
    //count 2
    count = 2;
    faceCard = true;
}

//function if card is king
function isKing(){
    //count 3
    count = 3;
    faceCard = true;
}

/***************works but throws infinite loop because no new card is played*******************/
/*
function faceLogic() {
    //TODO: right out faceLogic method
    //console.log(playerTurn);
    console.log("cards to play: " + count);

    for(var i = 0; i < count; i++){
        //var cards = i += 1;
        //something to dictate player needs to laydown card
        //swap players if there is a match only after card is played
        
        
        PlayCard(); //does need to be done by player
        //console.log("cards played: " + cards);
        //console.log(i);
        if(playerTurn !== currentPlayer){   //isCardFace method call
            //top card will alway be a match until a new one is played here i think.
            PlayCard(); //does need to be done by player
            faceCard = true;
        }
        
    }
    faceCard = false;
    console.log("the current player is:" + currentPlayer)
    if(currentPlayer === 0){
        playerTurn = 1;
        for (var i = 0; i < pile.length; i++) {
            if (pile.length === 0) {    //added additional equals - AC
					break;
            }
				
				player2Deck.splice(0, 0, pile);
				pile.pop();
			}
        
    }
    else if (currentPlayer === 1){
        playerTurn = 0;
        for (var i = 0; i < pile.length; i++) {
				if (pile.length === 0) {    //added additional equals - AC

					break;
				}
				
				player1Deck.splice(0, 0, pile);
				pile.pop();
			}
    }
}
*/
