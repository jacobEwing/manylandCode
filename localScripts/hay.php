#!/usr/bin/php
<?php

for($x = -400; $x < 400; $x += rand() % 3 + 1){
	$topx = $x + rand() % 11 - 5;
	$topy = -100 + rand() % 100;
	echo "$x 0\n";
	echo "$topx $topy\n";
	echo ($x + 2) . " 0\n";
}
