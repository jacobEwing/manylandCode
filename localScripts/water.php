#!/usr/bin/php
<?php
$ang = 2 * 3.14159 / 6;
$minx = -196;
$maxx = 196;

echo "\n" . $minx . ' ' . 200 . ' ';
for($x = $minx; $x <= $maxx; $x += 6){
	$ang += 3.14159 / 6;
	echo $x . ' ' . abs(floor(cos($ang) * 10)) . ' ';
}
echo $maxx . ' ' . 200 . "\n";
