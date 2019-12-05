//TODO: Once 2 player stuff works, we need slap to determine who slapped, so pile goes to correct player / correct player places 2 cards on bottom of pile on incorrecty slap

var deck, player1Deck, player2Deck, pile, pile2, playerTurn, playerName, pileCurrentlySlappable, pileCount, hadPreviousFaceCard, wait;


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

//used to keep track if UI has cards displayed still
var pileHasCards = false;

//keep track of player 1 and player 2 turn
var playerOneTurn = false;
var playerTwoTurn = false;

//used to track number of cards needed to play when face card played
var count;

//store first letter of card - AC
var firstLetter;

//0 is player1 and 1 is player 2. We toggle 0 and 1 to see who's turn it is.

function BuildDeck() {
     deck = [ "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
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
	
	//console.log(player1Deck);
	//console.log(player2Deck);
}


function StartGame() {
    
    gameStart = true;

    count = 0;
	
	pile = new Array();
    pile2 = new Array();
    player1Deck = new Array();
    player2Deck = new Array();
    
    pile.length = 0;
    pile2.length = 0;
    player1Deck.length = 0;
    player2Deck.length = 0;
    hasPreviousFaceCard = false;
    hadPreviousFaceCard = false;
    
    BuildDeck();
	ShuffleDeck();
	DealDeck();
    
	whoFirst();
    ClearPile();
	return(playerTurn);
}


function PlayCard() {
    
    hadPreviousFaceCard = false;
    wait = false;
    
    if (count > 0) {
        hasPreviousFaceCard = true;
    }
    
    if(pileHasCards == true){
        return;
    }
    
	if (playerTurn === 0) {    //added additional equals - AC
		pile.splice(0, 0, player1Deck[player1Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player1Deck.pop();
        pile2 = pile.slice();
        
        /*******************************/
        if(count > 0){
            playerTurn = 0;
            count--;
            playerOneTurn = true; //MR, code to keep track of highlighting player deck
            playerTwoTurn = false; //MR, code to keep track of highlighting player deck
            
        } else {
		  playerTurn = 1; //mikes original code
          playerOneTurn = false; //MR, code to keep track of highlighting player deck
          playerTwoTurn = true; //MR, code to keep track of highlighting player deck


        }
        
        if (player1Deck.length === 0) {    //added additional equals - AC
			
			//game over logic
            gameStart = false;
			return;
		}
		
	} else {

		pile.splice(0, 0, player2Deck[player2Deck.length - 1]); //changed 0 to pile (builds deck 0) - AC
		player2Deck.pop();
        pile2 = pile.slice();
        
         //Mostly Client side now
        //DisplayTop5();
        
        /*******************************/
        if(count > 0){
            playerTurn = 1;
            count--;

        } else {
		playerTurn = 0; //mikes original code
        }
        
		if (player2Deck.length === 0) {    //added additional equals - AC
			
			//game over logic
            gameStart = false;
			return;
		}		
	}
	
    
    isCardFace(); //check for face card on card play
	IsPileSlappable(); //checks to see if pile is legal to slap
    
    
    if(count === 0 && hasPreviousFaceCard){
        hasPreviousFaceCard = false;
        hadPreviousFaceCard = true;

        
        var temp;
        temp = pile;
        
        if (playerTurn === 0) {
            temp = temp.concat(player1Deck);
            player1Deck = temp;
            wait = true;
        } else {
            temp = temp.concat(player2Deck);
            player2Deck = temp;
            wait = true;
        }
        
        //Client Side Now
        //ClearPile();
    }
	
//	  console.log(player1Deck);
//	  console.log(player2Deck);
//	  console.log(pile);
//    console.log("Turn: " + playerTurn);
//    console.log("count: " + count);
//    console.log("FaceCard: " + faceCard);
//    console.log("hasPreviousFaceCard: " + hasPreviousFaceCard);
}

//TODO: DOM End game scenario within PlayCard()

function HasPreviousFaceCard() {

    return hadPreviousFaceCard;
}

function DisplayTop5() {
    
    let myPile = JSON.stringify(pile);

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

function emptyPile() {
     pile.length = 0;
}

//needs to be called somewhere when before the game is started -AC
function ClearPile(){
    emptyPile();
    var isEmpty;

    if ((gameStart === true || gameStart === false) && pile.length === 0){  //not sure on this logic -AC
        isEmpty = true;
        //console.log("isEmpty = " + isEmpty);
        return isEmpty;
    }
    else
    {
        isEmpty = false;
        //console.log("isEmpty = " + isEmpty);
        return isEmpty;
    }
}

function updatePlayerOneScore()
{
    return player1Deck.length.toString();
}

function updatePlayerTwoScore()
{
    return player2Deck.length.toString();
}


function IsPileSlappable() {

    //console.log("Pile length JS side: " + pile.length);
	if (pile.length < 2) {

		return pileCurrentlySlappable = false;
	} else {
		if (pile[0].substring(0, 1) === pile[1].substring(0, 1)) {    //added additional equals - AC
            //console.log("pile is slappable");
			return pileCurrentlySlappable = true;
		} else {
            //console.log("no matching cards");
			return pileCurrentlySlappable = false;
		}
	}
}








function slap(playerId) {
    hadPreviousFaceCard = false; //added to reset value on slap
    //console.log('playerId: ' + playerId);
    //console.log('playerId type: ' + typeof(playerId));
    //console.log('pile length: ' + pile2.length);
    
    if (pile2.length === 0) {    //added additional equals - AC
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
		var length = pile2.length;
        
		if (playerId === 0) {             //added additional equals - AC
			for (var i = 0; i < length; i++) {
				if (pile2.length === 0) {    //added additional equals - AC
					break;
				}

                player1Deck.splice(0, 0, pile2[pile2.length - 1]);
                pile2.pop();
			}
            playerTurn = 0;
            playerOneTurn = true;
            playerTwoTurn = false;
		} else {
			for (var i = 0; i < length; i++) {
				if (pile2.length === 0) {    //added additional equals - AC
					break;
				}

				player2Deck.splice(0, 0, pile2[pile2.length - 1]);
				pile2.pop();
			}
            playerTurn = 1;
            playerOneTurn = false;
            playerTwoTurn = true;
		}
		ClearPile();
        pile2.length = 0;
        count = 0;
        hasPreviousFaceCard = false;
        
	} else {
		var whoSlapped;       //let to var - ac		
		//current player plays 2 cards from bottom of deck to bottom of pile

		if(pile.length > 0){    //added so player cannot slap an empty deck
        //current player plays 2 cards from bottom of deck to bottom of pile -AC
		  if (playerId === 0) {
                    pile.splice(pile.length, 0, player1Deck[0]); //adds cards to the bottom of pile - AC
                    player1Deck.shift(); 
                
                    pile.splice(pile.length, 0, player1Deck[0]);
                    player1Deck.shift();  //because players remove from the top of their decks
		  } else {
                    pile.splice(pile.length, 0, player2Deck[0]); //adds cards to the bottom of pile -AC
                    player2Deck.shift();  //because players remove from the top of their decks -AC
                    pile.splice(pile.length, 0, player2Deck[0]);
                    player2Deck.shift();
		  }
        }//end if
		//check to see if this triggers end game condition
		if (player1Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//player 2 wins and game ends
            GetGameOver();
            EndGame();
            gameStart = false;
		} else if (player2Deck.length === 0) {    //added additional equals - AC
			//TODO: Accomplish the below comment
			//player 1 wins and game ends
            gameStart = false;
            GetGameOver();
            EndGame();
		}
	}
    
    DisplayTop5();
    
    //console.log(player1Deck);
    //console.log(player2Deck);
    //console.log(pile);
    //console.log('player turn: ' + playerTurn);
}

//TODO: DOM end game scenario in slap function


//call before face logic//
//used to check if card is face(set false when count is 0)
function isCardFace(){
    //console.log("player turn: " + playerTurn);
    //console.log("your card: " + pile[0]); //used for testing
    var card = pile[0];
    
    //console.log("first letter: " + card.charAt(0)) //used for testing
    
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
                    //console.log("no match");
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

function GetCount() {
    return count;
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

function GetGameOver() {
    if (player1Deck.length === 0) {
        return "1";
    } else if (player2Deck.length === 0) {
        return "0";
    } else {
        return "2";
    }
}

function getGameStart() {
    return gameStart;
}

function playerTurn() {
    return '' + playerTurn;
}

//function for endgame, feel free to change stuff, just keep the false assignment -AC
function EndGame(){
    gameStart = false;
    pile.length = 0;
    pile2.length = 0;
    player1Deck.length = 0;
    player2Deck.length = 0;
    hasPreviousFaceCard = false;
    hadPreviousFaceCard = false;
    count = 0;
    return gameStart;
}

function getName(){
    return '' + playerName;
}

//function to update tags?
//function updateTags(){
//    
//}
//function waitingPlayerTwo(show) {
//  messageVisibility('.waiting-message', show)
//}

//add functions here that you need to access in html or whatever -- mike 2019
module.exports = { StartGame: StartGame, PlayCard: PlayCard, slap: slap, GetWait: GetWait, ToggleGameStart: ToggleGameStart, HasPreviousFaceCard: HasPreviousFaceCard, DisplayTop5: DisplayTop5, IsPileSlappable: IsPileSlappable, ClearPile: ClearPile, emptyPile: emptyPile, GetCount: GetCount, EndGame: EndGame, getGameStart: getGameStart, updatePlayerOneScore: updatePlayerOneScore, updatePlayerTwoScore: updatePlayerTwoScore, GetGameOver: GetGameOver, playerTurn: playerTurn, getName: getName}