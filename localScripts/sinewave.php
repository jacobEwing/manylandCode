#!/usr/bin/php
	<?php
	$pi = 3.14159;
	$t = 0;
	for($x = 0; $x < 100; $x++){
		$sine = sin($x * $pi / 50);
		echo "$t: cell 1 up ";
		echo floor(5 * $sine);
		echo ", right 2\n";
		$t += .1;
	}
	?>
