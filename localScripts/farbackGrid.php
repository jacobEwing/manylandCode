#!/usr/bin/php
<?php
$cellnumber = 1;
$cellsize = 38;
$width = 8;
$height = 6;
$xOffset = -$width * $cellsize >> 1;
$yOffset = 0;//-$height * $cellsize >> 1;

for($x = 0; $x < $width; $x++){
	for($y = 0; $y < $height; $y++){
		echo "cell $cellnumber " . ($x * $cellsize + $xOffset) . ' ' . ($y * $cellsize + $yOffset) . "\n";
	}
}
