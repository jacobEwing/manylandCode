#!/usr/bin/php
<?php
$minx = -300;
$maxx = 300;
$step = 10;
$range = $maxx - $minx;
for($x = $minx; $x <= $maxx; $x += $step){
	$ang = ($x - $minx) /  $range;
	$y = 50 * sin($ang) - 120 + rand() % 10;
	echo $x . " " . floor($y) . "\n";

}
