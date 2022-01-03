#!/usr/bin/php
<?php
echo "0s: cell 1 show\n";
echo "0s-Xs: CELL 1 ROTATE -1080, CELL 2 ROTATE -1080\n";
$time = $timeIncrement = .02;
$toggle = 0;
for($ang = 0; $ang < 6.2832; $ang += .1){
	if($toggle){
		$showCells = "CELL 1 SHOW, CELL 2 HIDE";
	}else{
		$showCells = "CELL 2 SHOW, CELL 1 HIDE";
	}
	$pivotString = round(50 * sin($ang)) . " " . round(30 * cos(($ang + 2) * 2));
	echo $time . "s: CELL 1 pivot " . $pivotString . ", CELL 2 pivot $pivotString, $showCells\n";
	$toggle = 1 - $toggle;
	$time += $timeIncrement;
}
echo $time . "s: RESTART\n";

