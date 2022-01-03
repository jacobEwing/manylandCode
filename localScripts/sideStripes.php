#!/usr/bin/php
<?php
/* 
The purpose of this is to generate the co-ordinates for a farback forming
stripes on the outside of a room with perspective.
*/
$outside = 350;
$inside = 50;
$gap = 4;
$width = 8;
$outRatio = 3;
$yOffset = 50;
$numRows = 10;
$rowOffset = -5;

for($n = $rowOffset; $n < $numRows + $rowOffset; $n++){


	write($outside, -$n * $outRatio * ($gap + $width) + $yOffset);
	write($inside, -$n * ($gap + $width) + $yOffset);
	write($inside, -$n * ($gap + $width) + $width + $yOffset);
	write($outside, -$n * $outRatio * ($gap + $width) + $outRatio * $width + $yOffset);
}

function write($x, $y){
	echo $x . ' ' . $y . "\n";
}
