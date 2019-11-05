<?php
$this_ = $global;
$cardsScript = get($document, "currentScript");
call(new Func(function($root = null, $factory = null) use (&$define, &$exports, &$module, &$require) {
  if ((isset($define) ? _typeof($define) : "undefined") === "function" && is(get($define, "amd"))) {
    call($define, new Arr("jquery"), $factory);
  } else if ((isset($exports) ? _typeof($exports) : "undefined") === "object") {
    set($module, "exports", call($factory, call($require, "jquery")));
  } else {
    set($root, "cards", call($factory, get($root, "jQuery")));
  }


}, array("strict" => true)), $this_, new Func(function($«24» = null) use (&$window, &$cardsScript, &$Math, &$Number) {
  $addCardImages = new Func("addCardImages", function($hand = null, $cards = null) use (&$module) {
    if (not($cards)) {
      return ;
    }
    $cards = call_method($module, "cardNames", $cards);
    call_method($hand, "empty");
    for ($i = 0.0; $i < get($cards, "length"); ++$i) {
      $src = _concat("src='", get(get($module, "options"), "imagesUrl"), get($cards, $i), ".svg", "'");
      call_method($hand, "append", _concat("<img class='card' ", $src, ">"));
    }
  }, array("strict" => true));
  $readOptions = new Func("readOptions", function($«24»elem = null, $name = null) use (&$Number) {
    $o = new Object();
    $options = call_method($«24»elem, "data", $name);
    $options = call_method(call_method((is($or_ = $options) ? $or_ : ""), "replace", new RegExp("\\s", "g"), ""), "split", ";");
    for ($i = 0.0, $len = get($options, "length"); $i < $len; $i++) {
      $s = call_method(get($options, $i), "split", ":");
      $v = get($s, 1.0);
      if (is($v) && call_method($v, "indexOf", ",") >= 0.0) {
        set($o, get($s, 0.0), call_method($v, "split", ","));
      } else {
        set($o, get($s, 0.0), (is($or_ = call($Number, $v)) ? $or_ : $v));
      }

    }
    return $o;
  }, array("strict" => true));
  $fanCards = new Func("fanCards", function($cards = null, $self = null, $options = null) use (&$Math, &$calculateCoords, &$«24») {
    $n = get($cards, "length");
    if ($n === 0.0) {
      return ;
    }
    $width = (is($or_ = (is($or1_ = get($options, "width")) ? $or1_ : get(get($cards, 0.0), "clientWidth"))) ? $or_ : 90.0);
    $height = (is($or_ = get(get($cards, 0.0), "clientHeight")) ? $or_ : call_method($Math, "floor", to_number($width) * 1.4));
    $box = new Object();
    $coords = call($calculateCoords, $n, get($options, "radius"), $width, $height, get($options, "fanDirection"), get($options, "spacing"), $box);
    $hand = call_method(call($«24», get($cards, 0.0)), "parent");
    call_method($hand, "width", get($box, "width"));
    call_method($hand, "height", get($box, "height"));
    $i = 0.0;
    call_method($coords, "forEach", new Func(function($coord = null) use (&$cards, &$i, &$Math, &$self) {
      $card = get($cards, $i++);
      set(get($card, "style"), "left", _concat(get($coord, "x"), "px"));
      set(get($card, "style"), "top", _concat(get($coord, "y"), "px"));
      set($card, "onmouseover", new Func(function() use (&$card, &$self, &$coord) {
        call_method($self, "cardSetTop", $card, to_number(get($coord, "y")) - 10.0);
      }, array("strict" => true)));
      set($card, "onmouseout", new Func(function() use (&$card, &$self, &$coord) {
        call_method($self, "cardSetTop", $card, get($coord, "y"));
      }, array("strict" => true)));
      $rotationAngle = call_method($Math, "round", get($coord, "angle"));
      $prefixes = new Arr("Webkit", "Moz", "O", "ms");
      call_method($prefixes, "forEach", new Func(function($prefix = null) use (&$card, &$rotationAngle) {
        set(get($card, "style"), _concat($prefix, "Transform"), _concat("rotate(", $rotationAngle, "deg)", " translateZ(0)"));
      }, array("strict" => true)));
    }, array("strict" => true)));
  }, array("strict" => true));
  $calculateCoords = new Func("calculateCoords", function($numCards = null, $arcRadius = null, $cardWidth = null, $cardHeight = null, $direction = null, $cardSpacing = null, $box = null) use (&$Math) {
    $anglePerCard = call_method($Math, "radiansToDegrees", call_method($Math, "atan", _divide(to_number($cardWidth) * to_number($cardSpacing), $arcRadius)));
    $angleOffset = get(new Object("N", 270.0, "S", 90.0, "E", 0.0, "W", 180.0), $direction);
    $startAngle = to_number($angleOffset) - 0.5 * to_number($anglePerCard) * (to_number($numCards) - 1.0);
    $coords = new Arr();
    $minX = 99999.0;
    $minY = 99999.0;
    $maxX = _negate($minX);
    $maxY = _negate($minY);
    for ($i = 0.0; $i < $numCards; $i++) {
      $degrees = _plus($startAngle, to_number($anglePerCard) * to_number($i));
      $radians = call_method($Math, "degreesToRadians", $degrees);
      $x = _plus(_divide($cardWidth, 2.0), to_number(call_method($Math, "cos", $radians)) * to_number($arcRadius));
      $y = _plus(_divide($cardHeight, 2.0), to_number(call_method($Math, "sin", $radians)) * to_number($arcRadius));
      $minX = call_method($Math, "min", $minX, $x);
      $minY = call_method($Math, "min", $minY, $y);
      $maxX = call_method($Math, "max", $maxX, $x);
      $maxY = call_method($Math, "max", $maxY, $y);
      call_method($coords, "push", new Object("x", $x, "y", $y, "angle", _plus($degrees, 90.0)));
    }
    $rotatedDimensions = call_method($Math, "getRotatedDimensions", get(get($coords, 0.0), "angle"), $cardWidth, $cardHeight);
    $offsetX = 0.0;
    $offsetY = 0.0;
    if ($direction === "N") {
      $offsetX = to_number($minX) * -1.0;
      $offsetX = _plus($offsetX, _divide((to_number(get($rotatedDimensions, 0.0)) - to_number($cardWidth)), 2.0));
      $offsetY = to_number($minY) * -1.0;
    } else if ($direction === "S") {
      $offsetX = to_number($minX) * -1.0;
      $offsetX = _plus($offsetX, _divide((to_number(get($rotatedDimensions, 0.0)) - to_number($cardWidth)), 2.0));
      $offsetY = to_number(_plus($minY, to_number($maxY) - to_number($minY))) * -1.0;
    } else if ($direction === "W") {
      $offsetY = to_number($minY) * -1.0;
      $offsetY = _plus($offsetY, _divide((to_number(get($rotatedDimensions, 1.0)) - to_number($cardHeight)), 2.0));
      $offsetX = to_number($minX) * -1.0;
      $offsetX = _plus($offsetX, to_number($cardHeight) - to_number(get(call_method($Math, "rotatePointInBox", 0.0, 0.0, 270.0, $cardWidth, $cardHeight), 1.0)));
    } else if ($direction === "E") {
      $offsetY = to_number($minY) * -1.0;
      $offsetY = _plus($offsetY, _divide((to_number(get($rotatedDimensions, 1.0)) - to_number($cardHeight)), 2.0));
      $offsetX = to_number($arcRadius) * -1.0;
      $offsetX -= to_number($cardHeight) - to_number(get(call_method($Math, "rotatePointInBox", 0.0, 0.0, 270.0, $cardWidth, $cardHeight), 1.0));
    }



    call_method($coords, "forEach", new Func(function($coord = null) use (&$offsetX, &$Math, &$offsetY) {
      set($coord, "x", $offsetX, "+=");
      set($coord, "x", call_method($Math, "round", get($coord, "x")));
      set($coord, "y", $offsetY, "+=");
      set($coord, "y", call_method($Math, "round", get($coord, "y")));
      set($coord, "angle", call_method($Math, "round", get($coord, "angle")));
    }, array("strict" => true)));
    set($box, "width", _plus(get(get($coords, to_number($numCards) - 1.0), "x"), $cardWidth));
    set($box, "height", _plus(get(get($coords, to_number($numCards) - 1.0), "y"), $cardHeight));
    return $coords;
  }, array("strict" => true));
  $module = new Object("options", new Object("spacing", 0.2, "radius", 400.0, "flow", "horizontal", "fanDirection", "N", "imagesUrl", "cards/"), "cid", new Func(function($card = null) {
    $s = call_method($card, "attr", "src");
    return call_method($s, "substring", to_number(get($s, "length")) - 6.0, to_number(get($s, "length")) - 4.0);
  }, array("strict" => true)), "fan", new Func(function($hand = null, $cfg = null) use (&$«24», &$readOptions, &$addCardImages, &$fanCards) {
    $this_ = Func::getContext();
    $options = call_method($«24», "extend", new Object(), get($this_, "options"));
    $options = call_method($«24», "extend", $options, call($readOptions, $hand, "fan"));
    if (is($cfg)) {
      $options = call_method($«24», "extend", $options, $cfg);
    }
    call_method($hand, "data", "fan", _concat("radius: ", get($options, "radius"), "; spacing: ", get($options, "spacing")));
    call($addCardImages, $hand, get($options, "cards"));
    $cards = call_method($hand, "find", "img.card");
    if (get($cards, "length") === 0.0) {
      return ;
    }
    if (is(get($options, "width"))) {
      call_method($cards, "width", get($options, "width"));
    }
    call($fanCards, $cards, $this_, $options);
  }, array("strict" => true)), "hand", new Func(function($«24»hand = null, $cfg = null) use (&$«24», &$readOptions, &$addCardImages, &$Math) {
    $this_ = Func::getContext();
    $options = call_method($«24», "extend", new Object(), get($this_, "options"));
    $options = call_method($«24», "extend", $options, call($readOptions, $«24»hand, "hand"));
    if (is($cfg)) {
      $options = call_method($«24», "extend", $options, $cfg);
    }
    call_method($«24»hand, "data", "hand", _concat("flow: ", get($options, "direction"), ";"));
    call_method($«24»hand, "removeClass", "hhand fan hhand vhand vhand-compact hhand-compact");
    if (get($options, "flow") === "vertical" && get($options, "spacing") >= 1.0) {
      call_method($«24»hand, "addClass", "vhand");
    } else if (get($options, "flow") === "horizontal" && get($options, "spacing") >= 1.0) {
      call_method($«24»hand, "addClass", "hhand");
    } else if (get($options, "flow") === "vertical") {
      call_method($«24»hand, "addClass", "vhand-compact");
    } else {
      call_method($«24»hand, "addClass", "hhand-compact");
    }



    call($addCardImages, $«24»hand, get($options, "cards"));
    $cards = call_method($«24»hand, "find", "img.card");
    if (get($cards, "length") === 0.0) {
      return ;
    }
    if (is(get($options, "width"))) {
      call_method($cards, "width", get($options, "width"));
    }
    $width = (is($or_ = (is($or1_ = get($options, "width")) ? $or1_ : get(get($cards, 0.0), "clientWidth"))) ? $or_ : 70.0);
    $height = (is($or_ = get(get($cards, 0.0), "clientHeight")) ? $or_ : call_method($Math, "floor", to_number($width) * 1.4));
    if (get($options, "flow") === "vertical" && get($options, "spacing") < 1.0) {
      call_method(call_method($cards, "slice", 1.0), "css", "margin-top", _negate($height) * (1.0 - to_number(get($options, "spacing"))));
      call_method(call_method($cards, "slice", 1.0), "css", "margin-left", 0.0);
    } else if (get($options, "flow") === "horizontal" && get($options, "spacing") < 1.0) {
      call_method(call_method($cards, "slice", 1.0), "css", "margin-left", _negate($width) * (1.0 - to_number(get($options, "spacing"))));
      call_method(call_method($cards, "slice", 1.0), "css", "margin-top", 0.0);
    }

  }, array("strict" => true)), "cardSetTop", new Func(function($card = null, $top = null) {
    set(get($card, "style"), "top", _concat($top, "px"));
  }, array("strict" => true)), "cardNames", new Func(function($cards = null) {
    $names = new Arr();
    if ((isset($cards) ? _typeof($cards) : "undefined") === "string") {
      $cards = call_method($cards, "split", " ");
    }
    for ($i = 0.0; $i < get($cards, "length"); ++$i) {
      if (is(get($cards, $i))) {
        $name = call_method(call_method(get($cards, $i), "toString"), "toUpperCase");
        call_method($names, "push", $name);
      }
    }
    return $names;
  }, array("strict" => true)));
  set($module, "playCard", get($module, "remove"));
  call_method(call($«24», $window), "on", "load", new Func(function() use (&$«24», &$module) {
    call_method(call($«24», ".fan:not([data-bind])"), "each", new Func(function() use (&$module, &$«24») {
      $this_ = Func::getContext();
      call_method($module, "fan", call($«24», $this_));
    }, array("strict" => true)));
    call_method(call($«24», ".hand[data-hand]"), "each", new Func(function() use (&$module, &$«24») {
      $this_ = Func::getContext();
      call_method($module, "hand", call($«24», $this_));
    }, array("strict" => true)));
    call_method(call($«24», ".hand"), "on", "click", "img.card", new Func(function() use (&$module, &$«24») {
      $this_ = Func::getContext();
      call_method($module, "play", call($«24», $this_));
    }, array("strict" => true)));
  }, array("strict" => true)));
  if (is($cardsScript) && is(get($cardsScript, "src"))) {
    $path = _concat(call_method(get($cardsScript, "src"), "substring", 0.0, call_method(get($cardsScript, "src"), "lastIndexOf", "/")), "/cards/");
    set(get($module, "options"), "imagesUrl", $path);
  }
  return $module;
}, array("strict" => true)));
if (not(get($Math, "degreesToRadians"))) {
  set($Math, "degreesToRadians", new Func(function($degrees = null) use (&$Math) {
    return to_number($degrees) * _divide(get($Math, "PI"), 180.0);
  }));
}
if (not(get($Math, "radiansToDegrees"))) {
  set($Math, "radiansToDegrees", new Func(function($radians = null) use (&$Math) {
    return to_number($radians) * _divide(180.0, get($Math, "PI"));
  }));
}
if (not(get($Math, "getRotatedDimensions"))) {
  set($Math, "getRotatedDimensions", new Func(function($angle_in_degrees = null, $width = null, $height = null) use (&$Math) {
    $angle = _divide(to_number($angle_in_degrees) * to_number(get($Math, "PI")), 180.0); $sin = call_method($Math, "sin", $angle); $cos = call_method($Math, "cos", $angle);
    $x1 = to_number($cos) * to_number($width); $y1 = to_number($sin) * to_number($width);
    $x2 = _negate($sin) * to_number($height); $y2 = to_number($cos) * to_number($height);
    $x3 = to_number($cos) * to_number($width) - to_number($sin) * to_number($height); $y3 = _plus(to_number($sin) * to_number($width), to_number($cos) * to_number($height));
    $minX = call_method($Math, "min", 0.0, $x1, $x2, $x3); $maxX = call_method($Math, "max", 0.0, $x1, $x2, $x3); $minY = call_method($Math, "min", 0.0, $y1, $y2, $y3); $maxY = call_method($Math, "max", 0.0, $y1, $y2, $y3);
    return new Arr(call_method($Math, "floor", to_number($maxX) - to_number($minX)), call_method($Math, "floor", to_number($maxY) - to_number($minY)));
  }));
}
if (not(get($Math, "rotatePointInBox"))) {
  set($Math, "rotatePointInBox", new Func(function($x = null, $y = null, $angle = null, $width = null, $height = null) use (&$Math) {
    $angle = call_method($Math, "degreesToRadians", $angle);
    $centerX = _divide($width, 2.0);
    $centerY = _divide($height, 2.0);
    $dx = to_number($x) - to_number($centerX);
    $dy = to_number($y) - to_number($centerY);
    $dist = call_method($Math, "sqrt", _plus(to_number($dx) * to_number($dx), to_number($dy) * to_number($dy)));
    $a = _plus(call_method($Math, "atan2", $dy, $dx), $angle);
    $dx2 = to_number(call_method($Math, "cos", $a)) * to_number($dist);
    $dy2 = to_number(call_method($Math, "sin", $a)) * to_number($dist);
    return new Arr(_plus($dx2, $centerX), _plus($dy2, $centerY));
  }));