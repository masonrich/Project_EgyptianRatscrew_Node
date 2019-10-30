<?php
    $deck = array( "AS", "2S", "3D", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD" );
    $playerTurn = 0;
    $player1Deck = array();
    $player2Deck = array();
    $gameStart = false;
    $pile = array();
    $player1Name;
    $player2Name;
    $pileCurrentlySlappable
    $pileCount = 0;
    $faceCard = false;
    $hasPreviousFaceCard = false;
    $gameStart = false;
    $count = 0;
    $firstLetter;
    
    if (isset($_GET['StartGame'])) {
        StartGame();
        return;
    }

    function whoFirst() {
        return rand(0, 1);
    }

    function DealDeck() {
        
        global $deck, $playerTurn, $gameStart, $pile, $player1Deck, $player2Deck, $gameStart, $pile, $player1Name, $player2Name, $pileCurrentlySlappable, $pileCount, $faceCard, $hasPreviousFaceCard, $gameStart, $count, $firstLetter;
        
        for ($i = 0; $i < 26; $i++)
        {
            array_push($player1Deck, $deck[$i]);
            array_pop($deck);
            echo count($deck);
        }
        echo '<br>';
        for ($j = 25; $j >= 0; $j--)
        {
            array_push($player2Deck, $deck[$j]);
            array_pop($deck);
            echo count($deck);
        }
    }

    function StartGame() {
        global $deck, $playerTurn, $gameStart, $pile, $player1Deck, $player2Deck, $gameStart, $pile, $player1Name, $player2Name, $pileCurrentlySlappable, $pileCount, $faceCard, $hasPreviousFaceCard, $gameStart, $count, $firstLetter;

        shuffle($deck);
        $playerTurn = whoFirst();
        DealDeck();
        $gameStart = true;
        $pile = array();
        //TODO: clearPile function call
    }


?>

<html lang="en">
<head>


<!--
Honor Code: I acknowledge that this code represents my own work: 
Initials: MJR    
Date: October 14th, 2019
-->
<meta charset="UTF-8" />
<meta name="author" content="Mason Rich" />
<meta name="description" content="Egyptian Ratscrew" />
<meta name="keywords" content="Egyptian Ratscrew, cards, face cards, game" />

<!-- scaling for devices -->
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
 

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    
<!-- link for glyphicons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

<!-- FONT AWESOME -->
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    
<!-- Link for google font -->
<link href="https://fonts.googleapis.com/css?family=Hind" rel="stylesheet">

<!-- My style sheet -->
<link href="styles/game.css" rel="stylesheet" type="text/css"/>
    
<script src="scripts/game.js"></script>


<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
<link href="styles/cards.css" rel="stylesheet" type="text/css">

    
<title>Egyptian Ratscrew</title> 
</head>      
   <body>
       

       
       <div class="container-fluid">
       <!-- Jumbo Tron -->
       <div class="jumbotron">
           <h3><strong>EGYPTIAN RATSCREW</strong></h3>
       </div>
       
       <nav class="navbar navbar-expand-md">
           
           
           <!-- BUTTON FOR SMALL SCREENS -->
           <button class="navbar-toggler" data-toggle="collapse" data-target="#collapse_target">
              <span><i class="fa fa-bars"></i></span>
           </button>
           
           <div class="collapse navbar-collapse" id="collapse_target">
              <a href="index.html" class ="navbar-brand">
                   <span class="fa fa-home" active="active" aria-hidden="true"></span>
              </a>
                     
              <ul class="navbar-nav ml-auto">
                  <form method="get" action="">
                      <li class="nav-item"><input id="start-game" type="submit" name="StartGame" value="Start" class="nav-link" href="#"/> </li>
                      <li class="nav-item"><a id="end-game" name="EndGame" class="nav-link" href="#" >End</a></li>
                      <li class="nav-item"><a class="nav-link" href="rules.html" ><i class="fa fa-question-circle"></i></a></li>
                  </form>
              </ul> 
           </div>
       
       </nav>
       
       <section>
           
               <!-- Top Section -->
               <div class="row">
                   
                  <section id="topsection" class="col-sm-12 col-md-12 col-xs-12 col-lg-12 col-xl-12">
                    
                 
                  </section>
           
           
                </div>
           
                <!-- Middle Section -->
                <div class="row" id="rowsize">
                   
                   <!-- left side -->
                   <section id="leftsection" class="col-sm-12 col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <div>
                          <fieldset>
                             <label>Player 1</label>
                                   <div>
                                      <img src="cards/RED_BACK.svg" alt="Back of card">
                                   </div>
                           </fieldset>
                        </div>
                   </section>
                   
                   <!-- Middle of Middle Section -->
                   <section id="middlesection" class="col-sm-12 col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <div>
                          <fieldset>
                             <label>PILE</label> 

                              <div id="cardHolder" class="hand fan active-hand" style="width: 318px; height: 154px;">

                             
                                    <img class="card" id="card1" src="cards/QS.svg" style="left: 50px; top: 6px; transform: rotate(350deg) translateZ(0px);">
                                    <img class="card" id="card2" src="cards/JS.svg" style="left: 68px; top: 4px; transform: rotate(352deg) translateZ(0px);">
                                    <img class="card" id="card3" src="cards/10S.svg" style="left: 86px; top: 2px; transform: rotate(355deg) translateZ(0px);">
                                    <img class="card" id="card4" src="cards/9H.svg" style="left: 104px; top: 0px; transform: rotate(357deg) translateZ(0px);">
                                    <img class="card" id="card5" src="cards/3H.svg" style="left: 122px; top: 0px; transform: rotate(360deg) translateZ(0px);">
                                  
                       
	                           </div>
                              
                              <button id="slapButton">SLAP</button>
                              <button id="PlayCardButton">PLAY CARD</button>

                                  
                           </fieldset>
                        </div>
                   </section>
                   
                   <!-- Right side -->
                   <section id="rightsection" class="col-sm-12 col-md-4 col-xs-12 col-lg-4 col-xl-4">
                       <div>
                          <fieldset>
                             <label>Player 2</label> 
                             <img class="draggable" src="cards/RED_BACK.svg" alt="Back of card">
                           </fieldset>
                        </div>
                   </section>
                   
               </div>
               <hr>
           
               <!-- Radio Buttons breakfast, lunch, dinner -->
               <div class="row">
           
           
               </div>
       
       
       </section>
      
      
      
     <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
     <script type="text/javascript" src="scripts/game.js"></script>

     <script src="scripts/cards.js"></script>
     <script>   
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date(); a = s.createElement(o),
          m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-60043592-1', 'auto');
            ga('send', 'pageview');
     </script> 


</div>
   </body>

</html>

