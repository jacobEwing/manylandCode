#!/usr/bin/php
<?php

$lineMax = 28 * 2 + 29; // maxiumum pixels per line
array_shift($argv);

$lineText = "";
while(count($argv)){
	$word = array_shift($argv);
	if(get_text_width($lineText . ' ' . $word) <= $lineMax){
		if($lineText != ''){
			$lineText .= ' ';
		}
		$lineText .= $word;
	}else{
		echo scrubForDynamic($lineText . "\n");
		$lineText = $word;
	}
}

echo scrubForDynamic($lineText) . "\n";

function scrubForDynamic($string){
	return str_replace(
		array("\n", "\\n", ',', ':'),
		array('[BREAK]', '[BREAK]', '[COMMA]', '[COLON]'),
		$string
	);
}

function get_text_width($string){
	$charWidths = array(
		'a' => 3, 'b' => 3, 'c' => 3, 'd' => 3, 'e' => 3, 'f' => 3, 'g' => 4, 'h' => 3, 'i' => 1, 'j' => 3,
		'k' => 4, 'l' => 3, 'm' => 5, 'n' => 4, 'o' => 4, 'p' => 3, 'q' => 4, 'r' => 4, 's' => 4, 't' => 3,
		'u' => 3, 'v' => 5, 'w' => 5, 'x' => 3, 'y' => 3, 'z' => 3, '0' => 4, '1' => 2, '2' => 3, '3' => 3,
		'4' => 4, '5' => 3, '6' => 3, '7' => 3, '8' => 4, '9' => 3, '(' => 2, ')' => 2, ';' => 2, ':' => 2,
		',' => 2, '.' => 1, "'" => 1, '"' => 3, '-' => 4, ' ' => 2, '!' => 1, '?' => 4, '\n' => 0
	);
	$rval = 0;
	for($n = 0; $n < strlen($string); $n++){
		$c = strtolower($string[$n]);
		if(!array_key_exists($c, $charWidths)){
			throw new Exception("Unmeasured character: get_text_width(): '$c'\n");
		}
		$rval += $charWidths[$c] + 1;
	}
	return $rval;

}
