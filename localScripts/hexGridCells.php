#!/usr/bin/php
<?php

for($x = -3; $x <= 3; $x++){
	for($y = -2; $y <= 2; $y++){
		if($x & 1){
			echo "cell 1 " . (31 * $x) . " " . (19 + 38 * $y) . "\n";
		}else{
			echo "cell 1 " . (31 * $x) . " " . (38 * $y) . "\n";
		}
	}
}
