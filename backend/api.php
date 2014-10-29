<?php
require_once('db.php');

$action = $_GET['a'];

switch ($action) {
	case 'ap': // add player
		break;

	case 'as': // add series
		$sql = "INSERT INTO series VALUES ('', '".$_GET['prize']."', '".$_GET['length']."', '".$_GET['t1p1']."', '".$_GET['t1p2']."', '".$_GET['t2p1']."', '".$_GET['t2p2']."', '".$_GET['adv1']."', '".$_GET['adv2']."', 0, 0)";
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
		// $sql = "SELECT series.id, prize, length, team1player1, team1player2, team2player1, team2player2, done, redeemed, COUNT(matches.id) AS played FROM series LEFT JOIN matches ON matches.series_id = series.id";
		$sql = "SELECT series.id, prize, length, team1player1, team1player2, team2player1, team2player2, adv1, adv2, done, redeemed, COUNT(matches.id) AS played, SUM(CASE WHEN matches.team1score > matches.team2score then 1 else 0 end) AS team1total, SUM(CASE WHEN matches.team1score < matches.team2score then 1 else 0 end) AS team2total FROM series LEFT JOIN matches ON matches.series_id = series.id";
		
		if($_GET['which'] == 'on') {
			$sql .= " WHERE done = 0";
		}
		if($_GET['which'] == 're') {
			$sql .= " WHERE done = 1 AND redeemed = 0";
		}
		if($_GET['which'] == 'co') {
			$sql .= " WHERE done = 1 AND redeemed = 1";
		}


		if($_GET['pid'] > 0) {
			if($_GET['which'] == 'al') {
				$sql .= " WHERE";
			} else {
				$sql .= " AND";
			}
			$sql .= " (team1player1 = ".$_GET['pid']." OR team1player2 = ".$_GET['pid']." OR team2player1 = ".$_GET['pid']." OR team2player2 = ".$_GET['pid'].")";
		}
		if($_GET['pid2'] > 0) {
			$sql .= " AND (team1player1 = ".$_GET['pid2']." OR team1player2 = ".$_GET['pid2']." OR team2player1 = ".$_GET['pid2']." OR team2player2 = ".$_GET['pid2'].")";
		}
		if($_GET['pid3'] > 0) {
			$sql .= " AND (team1player1 = ".$_GET['pid3']." OR team1player2 = ".$_GET['pid3']." OR team2player1 = ".$_GET['pid3']." OR team2player2 = ".$_GET['pid3'].")";
		}
		if($_GET['pid4'] > 0) {
			$sql .= " AND (team1player1 = ".$_GET['pid4']." OR team1player2 = ".$_GET['pid4']." OR team2player1 = ".$_GET['pid4']." OR team2player2 = ".$_GET['pid4'].")";
		}

		$sql .= " GROUP BY series.id";
		$res = mysql_query($sql);
		$output = array();
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