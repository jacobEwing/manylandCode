#!/usr/bin/php
<?php
$cellindex = 2;
$pi = 3.14159;

$points = triangle();

for($state = 0; $state < 8; $state++){
	$ang = $state * $pi / 4;
	$sine = sin($ang);
	$cosine = cos($ang);
	echo "STATE " . ($state + 1) . "\n";
	echo "0: CELL $cellindex SHOW, SHAPE ";
	for($n = 0; $n < count($points); $n += 2){
		$x = $cosine * $points[$n] - $sine * $points[$n + 1];
		$y = $sine * $points[$n] + $cosine * $points[$n + 1];
		$y *= 0.5;
		echo round($x);
		echo " ";
		echo round($y / 2);
		echo "  ";
	}
	echo "\n\n";


}



function triangle(){
	return [ -32, -32, 32, -32, -32, 32];
}
