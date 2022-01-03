#!/usr/bin/php
<?php
$n = 0;
for($y = -200; $y <= 200; $y += 80){
	for($x = -200; $x <= 200; $x+= 80){
		if($n % 2){
			echo "$x $y cell 1\n";
		}else{
			echo ($x + 40) . " $y cell 1\n";
		}
	}
	$n++;
}
?>
