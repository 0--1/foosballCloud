<?php
require_once('db.php');

$action = $_GET['a'];

switch ($action) {
	case 'ap': // add player
		break;

	case 'as': // add series
		$sql = "INSERT INTO series VALUES ('', '".$_GET['prize']."', '".$_GET['length']."', '".$_GET['t1p1']."', '".$_GET['t1p2']."', '".$_GET['t2p1']."', '".$_GET['t2p2']."', 0, 0)";
		mysql_query($sql);
		print(mysql_insert_id());
		break;

	case 'am': // add a match
		$sql = "INSERT INTO matches VALUES ('',now(),'".$_GET['sid']."','".$_GET['t1s']."','".$_GET['t2s']."')";
		mysql_query($sql);

		if($_GET['done'] === 'true') {
			$sql = 'UPDATE series SET done = \'1\' WHERE id = '.$_GET['sid'];
			mysql_query($sql);
		}
		// print(mysql_insert_id());
		break;

	case 'lp': // list players
		$sql = "SELECT * FROM players ORDER BY id ASC";
		$res = mysql_query($sql);
		$output = "";
		while($row = mysql_fetch_assoc($res)) {
			$output[] = $row;
		}
		write($output);
		break;

	case 'ls': // list series
		$sql = "SELECT series.id, prize, length, team1player1, team1player2, team2player1, team2player2, done, redeemed, COUNT(matches.id) AS played FROM series LEFT JOIN matches ON matches.series_id = series.id";
		if($_GET['pid'] > 0) {
			$sql .= " WHERE (team1player1 = ".$_GET['pid']." OR team1player2 = ".$_GET['pid']." OR team2player1 = ".$_GET['pid']." OR team2player2 = ".$_GET['pid'].")";
		}
		$sql .= " GROUP BY series.id";
		$res = mysql_query($sql);
		$output = "";
		while($row = mysql_fetch_assoc($res)) {
			$output[] = $row;
		}
		write($output);
		break;

	case 'lm': // list matches in a series
		$sql = "SELECT * FROM series LEFT JOIN matches ON series.id = matches.series_id WHERE series.id = '".$_GET['sid']."'";
		$res = mysql_query($sql);
		$output = "";
		while($row = mysql_fetch_assoc($res)) {
			$output[] = $row;
		}
		write($output);
		break;
	
	case 'mr': // mark as redeemed
		$sql = 'UPDATE series SET redeemed = \'1\' WHERE id = '.$_GET['sid'];
		mysql_query($sql);
		break;

	default:
		break;
}

function write($data) {
	print json_encode($data);
}
?>