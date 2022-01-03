#!/usr/bin/php
<?php

doSpiral();

function doPetal(){
	$rad = 0;
	$ang = 0;
	$angi = 0.05;
	$radi = 1.3;
	$maxRad = 50;

	for($rad = 0; $rad < $maxRad; $rad += $radi){
		$ang += $angi;
		echo round(sin($ang) * $rad) . ' ' . round(cos($ang) * $rad) . '  ';
	}


	for(; $rad > 0; $rad -= $radi){
		$ang += $angi;
		echo round(sin($ang) * $rad) . ' ' . round(cos($ang) * $rad) . '  ';
	}

	echo "\n\n";
}

function doSpiral(){
	$rad = 0;
	$ang = 0;
	$angi = 0.3;
	$maxAng = 24;
	$radi = 1;

	for($ang = 0; $ang < $maxAng; $ang += $angi){
		$rad += $radi;
		echo round(sin($ang) * $rad) . ' ' . round(cos($ang) * $rad) . '  ';
	}

	$rad *= 0.5;

	for(; $ang > 0 && $rad > 0; $ang -= $angi){
		$rad -= $radi;
		echo round(sin($ang) * $rad) . ' ' . round(cos($ang) * $rad) . '  ';
	}

	echo "\n\n";
}

function doThickerSpiral(){
	$rad = 0;
	$ang = 0;
	$angi = -0.5;
	$maxAng = -24;
	$radi = 1;

	for($ang = 0; $ang > $maxAng; $ang += $angi){
		$rad += $radi;
		echo round(sin($ang) * $rad) . ' ' . round(cos($ang) * $rad) . '  ';
	}

	$rad -= 1;

	for(; $ang < 0; $ang -= $angi){
		$rad -= $radi;
		echo round(sin($ang) * $rad) . ' ' . round(cos($ang) * $rad) . '  ';
	}

	echo "\n\n";
}
