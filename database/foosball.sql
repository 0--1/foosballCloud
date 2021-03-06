-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 03, 2014 at 02:28 AM
-- Server version: 5.5.33
-- PHP Version: 5.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `foosball`
--

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `series_id` int(10) unsigned NOT NULL,
  `team1score` tinyint(3) unsigned NOT NULL,
  `team2score` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `date`, `series_id`, `team1score`, `team2score`) VALUES
(1, '2014-09-29', 1, 12, 14),
(2, '2014-09-28', 1, 14, 11),
(3, '2014-09-27', 1, 13, 12),
(4, '2014-09-26', 2, 15, 10),
(5, '2014-09-22', 2, 9, 11),
(6, '2014-09-20', 2, 18, 14),
(7, '2014-09-30', 1, 2, 1),
(8, '2014-10-01', 4, 6, 4);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `image` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `image`) VALUES
(1, 'Behrooz', 'bkamali.jpg'),
(2, 'Douglas', 'dvanduyne.jpg'),
(3, 'Andy', 'acheng.jpg'),
(4, 'Joe', 'jkoudsi.jpg'),
(5, 'Athena', 'abringhurst.jpg'),
(6, 'Dan', 'dcox.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `prize` varchar(32) NOT NULL,
  `length` tinyint(3) unsigned NOT NULL,
  `team1player1` tinyint(3) unsigned NOT NULL,
  `team1player2` tinyint(3) unsigned NOT NULL,
  `team2player1` tinyint(3) unsigned NOT NULL,
  `team2player2` tinyint(3) unsigned NOT NULL,
  `redeemed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`id`, `prize`, `length`, `team1player1`, `team1player2`, `team2player1`, `team2player2`, `redeemed`) VALUES
(1, 'Jamba', 7, 1, 2, 3, 4, 0),
(2, 'Jamba', 3, 1, 4, 2, 3, 0),
(4, 'Jamba', 7, 6, 5, 2, 3, 0),
(5, 'Jamba', 7, 5, 6, 3, 2, 0),
(6, 'Jamba', 7, 6, 5, 3, 4, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
         