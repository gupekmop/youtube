<?php
header("Content-type: text/html; charset=utf-8");
if (($file = @file(date("Ymd") . ".log")) !== false) {
	$file = array_reverse($file);
	$file = array_map("rtrim", $file);
	echo "<pre>";
	print_r($file);
	echo "</pre>";
}