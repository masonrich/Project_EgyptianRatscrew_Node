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
    
    console.log('made it to start game');
    
    gameStart = true;
	BuildDeck();
	ShuffleDeck();
	DealDeck();
	
	pile = new Array();
	whoFirst();
    //ClearPile(false);
	return(playerTurn);
}


function PlayCard() {
    if (count > 0) {
        hasPreviousFaceCard = true;
    }
    
	if (playerTurn === 0) {    //added additional equals - AC
		
		pile.splice(0, 0, player1Deck[player1Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player1Deck.pop();
        DisplayTop5();
        /*******************************/
        if(count > 0){
            playerTurn = 0;
            count--;
            
        } else {
		  playerTurn = 1; //mikes original code
        }
        
        if (player1Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//game over logic
            gameStart = false;
			return;
		}
		
	} else {
		
		pile.splice(0, 0, player2Deck[player2Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player2Deck.pop();
        DisplayTop5();
        /*******************************/
        if(count > 0){
            playerTurn = 1;
            count--;
        } else {
		playerTurn = 0; //mikes original code
        }
        
		if (player2Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//game over logic
            gameStart = false;
			return;
		}
		
	}
	
    
    isCardFace(); //check for face card on card play
	IsPileSlappable(); //checks to see if pile is legal to slap
    
    
    if(count === 0 && hasPreviousFaceCard){
        hasPreviousFaceCard = false;
        
        var temp;
        temp = pile;
        
        if (playerTurn === 0) {
            temp = temp.concat(player1Deck);
            player1Deck = temp;
        } else {
            temp = temp.concat(player2Deck);
            player2Deck = temp;
        }
        
        pile.length = 0;
        
        //sleep(2000);
        ClearPile(true);
    }
	
	console.log(player1Deck);
	console.log(player2Deck);
	console.log(pile);
    console.log("Turn: " + playerTurn);
    console.log("count: " + count);
    console.log("FaceCard: " + faceCard);
    console.log("hasPreviousFaceCard: " + hasPreviousFaceCard);
}



function DisplayTop5() {
    
    pileCount = pile.length;
    
    if (pileCount > 0) {
        document.getElementById("card5").src = "cards/" + pile[0] + ".svg";
    }
    
    if (pileCount > 1) {
       document.getElementById("card4").src = "cards/" + pile[1] + ".svg";
    }
    
    if (pileCount > 2) {
         document.getElementById("card3").src = "cards/" + pile[2] + ".svg";
    }
    
    if (pileCount > 3) {
        document.getElementById("card2").src = "cards/" + pile[3] + ".svg";
    }
    
    if (pileCount > 4) {
        document.getElementById("card1").src = "cards/" + pile[4] + ".svg";
    }   
    
    //sleep(2000);
}

function ClearPile(wait) {
    
    if(wait) {
        gameStart = false;
  

        setTimeout( function() {
             document.getElementById("card5").src = "cards/blank.jpeg"; 
             document.getElementById("card4").src = "cards/blank.jpeg"; 
             document.getElementById("card3").src = "cards/blank.jpeg"; 
             document.getElementById("card2").src = "cards/blank.jpeg"; 
             document.getElementById("card1").src = "cards/blank.jpeg"; 

             gameStart = true;
        }, 2000);
        
    } else {
      document.getElementById("card5").src = "cards/blank.jpeg"; 
      document.getElementById("card4").src = "cards/blank.jpeg"; 
      document.getElementById("card3").src = "cards/blank.jpeg"; 
      document.getElementById("card2").src = "cards/blank.jpeg"; 
      document.getElementById("card1").src = "cards/blank.jpeg";    
    }
}


function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
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
		ClearPile(true);
        
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
    
    DisplayTop5();
    
    console.log(player1Deck);
    console.log(player2Deck);
    console.log(pile);
}




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

module.exports = { StartGame: StartGame }