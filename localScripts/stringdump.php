#!/usr/bin/php
<?php
$mystring = "https://raw.githubusercontent.com/jacobEwing/weblibs/master/geometry.js";
$charlist = [];

for($n = 0; $n < strlen($mystring); $n++){
	$charlist[count($charlist)] = ord($mystring[$n]);	
}
echo implode($charlist, ', ') . "\n";
