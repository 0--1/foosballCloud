<?php
require_once('db.php');

$sql = $_GET['sql'];

// print_r($_GET);

$res = mysql_query($sql);

$output = "";

while($row = mysql_fetch_assoc($res)) {
	$output[] = $row;
}

print json_encode($output);
?>