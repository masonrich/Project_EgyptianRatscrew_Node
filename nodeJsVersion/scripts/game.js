//window.onload();


var deck, player1Deck, player2Deck, pile, playerTurn, player1Name, player2Name, pileCurrentlySlappable, pileCount;


/*
deck: array of all cards
player1Deck: array of player one cards
player2Deck: array of player two cards
pile: array of cards in current pile
playerTurn: counter for player turn
*/

//boolean flags for face cards
var faceCard = false;
var hasPreviousFaceCard = false;

//used to track gamestart
var gameStart = false;

//used to track number of cards needed to play when face card played
var count;

//store first letter of card - AC
var firstLetter;

//0 is player1 and 1 is player 2. We toggle 0 and 1 to see who's turn it is.


function BuildDeck() {
     deck = [ "AS", "2S", "3D", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
              "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC",
              "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
              "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD"];
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



//document.getElementById("slapButton").onclick = function() { if(gameStart){slap()}};
//document.getElementById("PlayCardButton").onclick = function() {if(gameStart){PlayCard()}};


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
    
    gameStart = true;
	BuildDeck();
	ShuffleDeck();
	DealDeck();
    count = 0;
	
	pile = new Array();
	whoFirst();
    //ClearPile(false);
	return(playerTurn);
}


function PlayCard() {
    
    console.log('log: 1');
    
    if (count > 0) {
        hasPreviousFaceCard = true;
    }
    
        console.log('log: 2');
    
	if (playerTurn === 0) {    //added additional equals - AC
		
		pile.splice(0, 0, player1Deck[player1Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player1Deck.pop();
        
            console.log('log: 3');
        
        //Mostly Client Side Now
        //DisplayTop5();
        
        /*******************************/
        if(count > 0){
            playerTurn = 0;
            count--;
            
                console.log('log: 4');
            
        } else {
		  playerTurn = 1; //mikes original code
        }
        
        if (player1Deck.length === 0) {    //added additional equals - AC
			
			//game over logic
            gameStart = false;
			return;
		}
		
	} else {
		
            console.log('log: 5');
		pile.splice(0, 0, player2Deck[player2Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player2Deck.pop();
        
         //Mostly Client side now
        //DisplayTop5();
        
        /*******************************/
        if(count > 0){
            playerTurn = 1;
            count--;
                console.log('log: 6');
        } else {
		playerTurn = 0; //mikes original code
        }
        
		if (player2Deck.length === 0) {    //added additional equals - AC
			
			//game over logic
            gameStart = false;
			return;
		}		
	}
	
        console.log('log: 7');
    
    isCardFace(); //check for face card on card play
	IsPileSlappable(); //checks to see if pile is legal to slap
    
    
    if(count === 0 && hasPreviousFaceCard){
        hasPreviousFaceCard = false;
        
            console.log('log: 8');
        
        var temp;
        temp = pile;
        
        if (playerTurn === 0) {
            temp = temp.concat(player1Deck);
            player1Deck = temp;
        } else {
            temp = temp.concat(player2Deck);
            player2Deck = temp;
        }
        
            console.log('log: 9');
        
        pile.length = 0;
        
        //Client Side Now
        //ClearPile(true);
    }
	
	console.log(player1Deck);
	console.log(player2Deck);
	console.log(pile);
    console.log("Turn: " + playerTurn);
    console.log("count: " + count);
    console.log("FaceCard: " + faceCard);
    console.log("hasPreviousFaceCard: " + hasPreviousFaceCard);
}

//TODO: DOM End game scenario within PlayCard()

function HasPreviousFaceCard() {
        console.log('made it to js hasPreviousFaceCard');
    return hasPreviousFaceCard;
}

function DisplayTop5() {
    let myPile = JSON.stringify(pile);
    console.log(myPile);
    console.log("Made it inside JS side DisplayTop5");
    return myPile;    
}

function GetWait() {
    return wait;
}

function ToggleGameStart() {
    if (gameStart) {
        gameStart = false;
    } else {
        gameStart = true;
    }
}


function IsPileSlappable() {
	if (pile.length < 2) {
		return pileCurrentlySlappable = false;
	} else {
		if (pile[0].substring(0, 1) === pile[1].substring(0, 1)) {    //added additional equals - AC
			return pileCurrentlySlappable = true;
		} else {
			return pileCurrentlySlappable = false;
		}
	}
}








function slap() {
	console.log("Worked");
    
    if (pile.length === 0) {    //added additional equals - AC
        console.log("slapped empty pile");
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
		
		if (playerTurn === 0) {             //added additional equals - AC
			for (var i = 0; i < length; i++) {
				if (pile.length === 0) {    //added additional equals - AC
					break;
				}

                player1Deck.splice(0, 0, pile[pile.length - 1]);
                pile.pop();
			}
		} else {
			for (var i = 0; i < length; i++) {
				if (pile.length === 0) {    //added additional equals - AC
					break;
				}
				
				player2Deck.splice(0, 0, pile[pile.length - 1]);
				pile.pop();
			}
		}
        //TODO: DOM this
		ClearPile(true);
        //TODO: DOM this
        
	} else {
		var whoSlapped;       //let to var - ac
		//TODO: Accomplish the below comment
		//Need asnyc to determine which player incorrectly slapped.
		if (playerTurn === 0) {   //changed original undeclared variable to this one -AC
			whoSlapped = 0;
		} else if (playerTurn === 1){
			whoSlapped = 1;
		}
		
		//current player plays 2 cards from bottom of deck to bottom of pile
		if (whoSlapped === 0) {
                pile.splice(pile.length, 0, player1Deck[1]); //adds cards to the bottom of pile - AC
                player1Deck.shift(); 
                
                pile.splice(pile.length, 0, player1Deck[0]);
                //console.log(pile);    //for testing
                player1Deck.shift();  //because players remove from the top of their decks
                //console.log(player1Deck); //for testing
		} else {
                pile.splice(pile.length, 0, player2Deck[1]); //adds cards to the bottom of pile -AC
                //console.log(pile);    //for testing
                player2Deck.shift();  //because players remove from the top of their decks -AC
                //console.log(player2Deck); //for testing
                pile.splice(pile.length, 0, player2Deck[0]);
                player2Deck.shift();
		}
		
		//check to see if this triggers end game condition
		if (player1Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//player 2 wins and game ends
            gameStart = false;
		} else if (player2Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//player 1 wins and game ends
            gameStart = false;
		}
	}
    
    //TODO: DOM this
    DisplayTop5();
    //TODO: DOM this
    
    console.log(player1Deck);
    console.log(player2Deck);
    console.log(pile);
}

//TODO: DOM end game scenario in slap function


//call before face logic//
//used to check if card is face(set false when count is 0)
function isCardFace(){
    //console.log("player turn: " + playerTurn);
    //console.log("your card: " + pile[0]); //used for testing
    var card = pile[0];
    
    console.log("first letter: " + card.charAt(0)) //used for testing
    
    firstLetter = card.charAt(0);
    
    if(firstLetter === 'K' || firstLetter === 'Q'|| firstLetter === 'J' || firstLetter === 'A'){
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
    } else {
        faceCard = false;
    }
    
    if (!faceCard && hasPreviousFaceCard && count === 0) {
        if (playerTurn === 0) {
            playerTurn = 1;
            } else {
                playerTurn = 0;
            }
        }
    else if (faceCard && hasPreviousFaceCard) {
     if (playerTurn === 0) {
        playerTurn = 1;
        } else {
            playerTurn = 0;
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

//function for endgame, feel free to change stuff, just keep the false assignment -AC
function EndGame(){
    gameStart = false;
}

//add functions here that you need to access in html or whatever -- mike 2019
module.exports = { StartGame: StartGame, PlayCard: PlayCard, slap: slap, GetWait: GetWait, ToggleGameStart: ToggleGameStart, HasPreviousFaceCard: HasPreviousFaceCard, DisplayTop5: DisplayTop5, IsPileSlappable: IsPileSlappable}