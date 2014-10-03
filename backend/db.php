<?php
error_reporting(6143);

$host = "localhost";
$user = "behrooz";
$pass = "12345";
$db = "foosball";

$con = mysql_connect($host, $user, $pass);
mysql_select_db($db, $con);
?>