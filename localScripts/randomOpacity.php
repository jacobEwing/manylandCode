#!/usr/bin/php
<?php
	/*
	All this does is generate a bunch of random opacities for all cells.
	Very handy if you want a quick flickering dynamic.
	*/
	$maxOpacity = 1.0;
	$minOpacity = 0.7;
	$range = $maxOpacity - $minOpacity;

	for($n = 0; $n < 14; $n += (rand() % 20) / 10){
		echo "$n: cells opacity " . (rand($minOpacity * 100, $maxOpacity * 100) / 100) . "\n";
	}
?>
