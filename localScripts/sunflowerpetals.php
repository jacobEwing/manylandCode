#!/usr/bin/php
<?php
$centerx = 0;
$centery = -100;
$radius = 23;
$angle = 0;
$numPedals = 10;
$pi = 3.14159;

for($ang = 0; $ang < 2 * $pi; $ang += 2 * $pi / $numPedals){
	$degrees = (round($ang * 180 / $pi) + 90) % 360;
	$x = round($centerx + cos($ang) * $radius);
	$y = round($centery + sin($ang) * $radius);

	echo "cell 1 $x $y rotate $degrees\n";
}

for($ang = $pi / $numPedals; $ang < 2 * $pi; $ang += 2 * $pi / $numPedals){
	$degrees = (round($ang * 180 / $pi) + 90) % 360;
	$x = round($centerx + cos($ang) * $radius);
	$y = round($centery + sin($ang) * $radius);

	echo "cell 1 $x $y rotate $degrees\n";
}

