<?php
error_reporting(6143);

$host = "localhost";
$user = "root";
$pass = "";
$db = "foosball";

$con = mysql_connect($host, $user, $pass);
mysql_select_db($db, $con);
?>