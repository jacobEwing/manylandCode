#!/usr/bin/php
<?php
/* just a quick one-off to render the farback points needed to plot distant sun rays casted down */
$pi = 3.14159;
$startAng = $pi / 3;
$endAng = $startAng + 2 * $pi;
$angi = $pi / 40;

$toggle = 0;
$firstRow = "foo";

for($ang = $startAng; $ang <= $endAng; $ang += $angi){
	$radius = $toggle < 2 ? 20 : 500;
	$toggle = ($toggle + 1) % 4;

	if($firstRow == "foo"){
		$firstRow = round($radius * cos($ang)) . ' ' . round($radius * sin($ang)) . "\n";
		echo $firstRow;
	}else{
		echo round($radius * cos($ang)) . ' ' . round($radius * sin($ang)) . "\n";
	}
}
echo $firstRow;
