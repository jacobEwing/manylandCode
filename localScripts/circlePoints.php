#!/usr/bin/php
<?php
$pi = 3.14159265358979;
$radius = 300;
for($ang = 0; $ang <= 2.1 * $pi; $ang += $pi / 20){
	echo floor($radius * sin($ang)) . ' ' . floor($radius * cos($ang)) . "\n";
}

$radius -= 50;

for($ang -= $pi / 20; $ang >= 0; $ang -= $pi / 20){
	echo floor($radius * sin($ang)) . ' ' . floor($radius * cos($ang)) . "\n";
}
