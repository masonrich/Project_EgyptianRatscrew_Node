<?php
    
    if(isset($_POST['StartGame'])) { 
            
        StartGame(); 
        }

function BuildDeck() {
  $deck = new Arr("AS", "2S", "3D", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD");
}

function whoFirst() {
  $random = call_method($Math, "random");
  if ($random < 0.5) {
    $playerTurn = 0.0;
  } else {
    $playerTurn = 1.0;
  }

  call_method($console, "log", $random);
}

function ShuffleDeck() {
  call_method($deck, "sort", new Func(function() use (&$Math) {
    return 0.5 - to_number(call_method($Math, "random"));
  }));
}

function DealDeck() {
  $player1Deck = _new($Array);
  $player2Deck = _new($Array);
  for ($i = 0.0; $i < 26.0; $i++) {
    call_method($player1Deck, "push", get($deck, to_number(get($deck, "length")) - 1.0));
    call_method($deck, "pop");
  }
  for ($i = 0.0; $i < 26.0; $i++) {
    call_method($player2Deck, "push", get($deck, to_number(get($deck, "length")) - 1.0));
    call_method($deck, "pop");
  }
  call_method($console, "log", $player1Deck);
  call_method($console, "log", $player2Deck);
}

function StartGame() {
  $gameStart = true;
  call($BuildDeck);
  call($ShuffleDeck);
  call($DealDeck);
  $pile = _new($Array);
  call($whoFirst);
  call($ClearPile, false);
  call_method($console, "log", $playerTurn);
  return;
}

function PlayCard() {
  if ($count > 0.0) {
    $hasPreviousFaceCard = true;
  }
  if ($playerTurn === 0.0) {
    call_method($pile, "splice", 0.0, 0.0, get($player1Deck, to_number(get($player1Deck, "length")) - 1.0));
    call_method($player1Deck, "pop");
    call($DisplayTop5);
    if ($count > 0.0) {
      $playerTurn = 0.0;
      $count--;
    } else {
      $playerTurn = 1.0;
    }

    if (get($player1Deck, "length") === 0.0) {
      $gameStart = false;
      return ;
    }
  } else {
    call_method($pile, "splice", 0.0, 0.0, get($player2Deck, to_number(get($player2Deck, "length")) - 1.0));
    call_method($player2Deck, "pop");
    call($DisplayTop5);
    if ($count > 0.0) {
      $playerTurn = 1.0;
      $count--;
    } else {
      $playerTurn = 0.0;
    }

    if (get($player2Deck, "length") === 0.0) {
      $gameStart = false;
      return ;
    }
  }

  call($isCardFace);
  call($IsPileSlappable);
  if ($count === 0.0 && is($hasPreviousFaceCard)) {
    $hasPreviousFaceCard = false;
    $temp = $pile;
    if ($playerTurn === 0.0) {
      $temp = call_method($temp, "concat", $player1Deck);
      $player1Deck = $temp;
    } else {
      $temp = call_method($temp, "concat", $player2Deck);
      $player2Deck = $temp;
    }

    set($pile, "length", 0.0);
    call($ClearPile, true);
  }
  call_method($console, "log", $player1Deck);
  call_method($console, "log", $player2Deck);
  call_method($console, "log", $pile);
  call_method($console, "log", _concat("Turn: ", $playerTurn));
  call_method($console, "log", _concat("count: ", $count));
  call_method($console, "log", _concat("FaceCard: ", $faceCard));
  call_method($console, "log", _concat("hasPreviousFaceCard: ", $hasPreviousFaceCard));
}

function DisplayTop5() {
  $pileCount = get($pile, "length");
  if ($pileCount > 0.0) {
    set(call_method($document, "getElementById", "card5"), "src", _concat("cards/", get($pile, 0.0), ".svg"));
  }
  if ($pileCount > 1.0) {
    set(call_method($document, "getElementById", "card4"), "src", _concat("cards/", get($pile, 1.0), ".svg"));
  }
  if ($pileCount > 2.0) {
    set(call_method($document, "getElementById", "card3"), "src", _concat("cards/", get($pile, 2.0), ".svg"));
  }
  if ($pileCount > 3.0) {
    set(call_method($document, "getElementById", "card2"), "src", _concat("cards/", get($pile, 3.0), ".svg"));
  }
  if ($pileCount > 4.0) {
    set(call_method($document, "getElementById", "card1"), "src", _concat("cards/", get($pile, 4.0), ".svg"));
  }
}

function ClearPile() {
  if (is($wait)) {
    $gameStart = false;
    call($setTimeout, new Func(function() use (&$document, &$gameStart) {
      set(call_method($document, "getElementById", "card5"), "src", "");
      set(call_method($document, "getElementById", "card4"), "src", "");
      set(call_method($document, "getElementById", "card3"), "src", "");
      set(call_method($document, "getElementById", "card2"), "src", "");
      set(call_method($document, "getElementById", "card1"), "src", "");
      $gameStart = true;
    }), 2000.0);
  } else {
    set(call_method($document, "getElementById", "card5"), "src", "");
    set(call_method($document, "getElementById", "card4"), "src", "");
    set(call_method($document, "getElementById", "card3"), "src", "");
    set(call_method($document, "getElementById", "card2"), "src", "");
    set(call_method($document, "getElementById", "card1"), "src", "");
  }

}

function mySleep() {
  $currentTime = call_method(_new($Date), "getTime");
  while (_plus($currentTime, $miliseconds) >= call_method(_new($Date), "getTime")) {
  }
}

function IsPileSlappable() {
  if (get($pile, "length") < 2.0) {
    $pileCurrentlySlappable = false;
  } else {
    if (call_method(get($pile, 0.0), "substring", 0.0, 1.0) === call_method(get($pile, 1.0), "substring", 0.0, 1.0)) {
      $pileCurrentlySlappable = true;
    } else {
      $pileCurrentlySlappable = false;
    }

  }

}

function slap() {
  call_method($console, "log", "Worked");
  if (get($pile, "length") === 0.0) {
    call_method($console, "log", "slapped empty pile");
    return ;
  }
  if (is($pileCurrentlySlappable)) {
    $length = get($pile, "length");
    if ($playerTurn === 0.0) {
      for ($i = 0.0; $i < $length; $i++) {
        if (get($pile, "length") === 0.0) {
          break;
        }
        call_method($player1Deck, "splice", 0.0, 0.0, get($pile, to_number(get($pile, "length")) - 1.0));
        call_method($pile, "pop");
      }
    } else {
      for ($i = 0.0; $i < $length; $i++) {
        if (get($pile, "length") === 0.0) {
          break;
        }
        call_method($player2Deck, "splice", 0.0, 0.0, get($pile, to_number(get($pile, "length")) - 1.0));
        call_method($pile, "pop");
      }
    }

    call($ClearPile, true);
  } else {
    if ($playerTurn === 0.0) {
      $whoSlapped = 0.0;
    } else if ($playerTurn === 1.0) {
      $whoSlapped = 1.0;
    }

    if ($whoSlapped === 0.0) {
      call_method($pile, "splice", get($pile, "length"), 0.0, get($player1Deck, 1.0));
      call_method($player1Deck, "shift");
      call_method($pile, "splice", get($pile, "length"), 0.0, get($player1Deck, 0.0));
      call_method($player1Deck, "shift");
    } else {
      call_method($pile, "splice", get($pile, "length"), 0.0, get($player2Deck, 1.0));
      call_method($player2Deck, "shift");
      call_method($pile, "splice", get($pile, "length"), 0.0, get($player2Deck, 0.0));
      call_method($player2Deck, "shift");
    }

    if (get($player1Deck, "length") === 0.0) {
      $gameStart = false;
    } else if (get($player2Deck, "length") === 0.0) {
      $gameStart = false;
    }

  }

  call($DisplayTop5);
  call_method($console, "log", $player1Deck);
  call_method($console, "log", $player2Deck);
  call_method($console, "log", $pile);
}

function isCardFace() {
  $card = get($pile, 0.0);
  call_method($console, "log", _concat("first letter: ", call_method($card, "charAt", 0.0)));
  $firstLetter = call_method($card, "charAt", 0.0);
  if ($firstLetter === "K" || $firstLetter === "Q" || $firstLetter === "J" || $firstLetter === "A") {
    switch ($firstLetter) {
      case "A":
        call($isAce);
        break;
      case "J":
        call($isJack);
        break;
      case "Q":
        call($isQueen);
        break;
      case "K":
        call($isKing);
        break;
      default:
        call_method($console, "log", "no match");
    }
  } else {
    $faceCard = false;
  }

  if (not($faceCard) && is($hasPreviousFaceCard) && $count === 0.0) {
    if ($playerTurn === 0.0) {
      $playerTurn = 1.0;
    } else {
      $playerTurn = 0.0;
    }

  } else if (is($faceCard) && is($hasPreviousFaceCard)) {
    if ($playerTurn === 0.0) {
      $playerTurn = 1.0;
    } else {
      $playerTurn = 0.0;
    }

  }

}

function isAce() {
  $count = 4.0;
  $faceCard = true;
}
function isJack() {
  $count = 1.0;
  $faceCard = true;
}
function isQueen() {
  $count = 2.0;
  $faceCard = true;
}
function isKing() {
  $count = 3.0;
  $faceCard = true;
}

function EndGame() {
  $gameStart = false;
}

$faceCard = false;

$hasPreviousFaceCard = false;

$gameStart = false;

//set(call_method($document, "getElementById", "slapButton"), "onclick", new Func(function() use (&$gameStart, &$slap) {
//  if (is($gameStart)) {
//    call($slap);
//  }
//}));
//
//set(call_method($document, "getElementById", "PlayCardButton"), "onclick", new Func(function() use (&$gameStart, &$PlayCard) {
//  if (is($gameStart)) {
//    call($PlayCard);
//  }
//}));
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
            hasPreviousFaceCard = true;
        }
        
    }
    hasPreviousFaceCard = false;
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
