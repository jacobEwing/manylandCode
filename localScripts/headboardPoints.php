#!/usr/bin/php
<?php

$limit = 1.66;

for($a = -$limit; $a <= $limit; $a += .1){
	echo floor(sin($a) * 200) . " " . (-floor(cos($a) * 100 + -100)) . "\n";
}

for($a = $limit; $a >= -$limit; $a -= .1){
	echo floor(sin($a) * 200) . " " . (-floor(cos($a) * 70 + -110)) . "\n";
}
