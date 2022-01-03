#!/usr/bin/php
<?php
$n = 0;
$currentPos = Array( 0 => 0, 1 => 0);
while($n < 14.4){

	$newPos = array(rand() % 400 - 200, rand() % 100 - 200);
	$dx = $newPos[0] - $currentPos[0];
	$dy = $newPos[1] - $currentPos[1];
	$currentPos = $newPos;
	echo "$n: CELLS UP $dx, RIGHT $dy, CELL 1 SHOW\n";
	$n += .1;
	echo "$n: CELLS HIDE, CELL 2 SHOW\n";
	$n += .1;
	echo "$n: CELLS HIDE, CELL 3 SHOW\n";
	$n += .1;
	echo "$n: CELLS HIDE, CELL 4 SHOW\n";
	$n += .1;
	echo "$n: CELLS HIDE, CELL 5 SHOW\n";
	$n += .1;
	echo "$n: CELLS HIDE, CELL 6 SHOW\n";
	$n += .1;
	echo "$n: CELL 6 HIDE\n";
	$n += .1;
}
