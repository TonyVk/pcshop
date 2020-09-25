-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 14, 2020 at 02:25 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pcshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikli`
--

DROP TABLE IF EXISTS `artikli`;
CREATE TABLE IF NOT EXISTS `artikli` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(100) NOT NULL,
  `Opis` varchar(250) NOT NULL,
  `JedinicaMjere` varchar(100) NOT NULL,
  `JedinicnaCijena` int(11) NOT NULL,
  `Kategorija` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Kategorija` (`Kategorija`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kategorije`
--

DROP TABLE IF EXISTS `kategorije`;
CREATE TABLE IF NOT EXISTS `kategorije` (
  `Sifra` int(11) NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(100) NOT NULL,
  PRIMARY KEY (`Sifra`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `pozicije`
--

DROP TABLE IF EXISTS `pozicije`;
CREATE TABLE IF NOT EXISTS `pozicije` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(120) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `racuni`
--

DROP TABLE IF EXISTS `racuni`;
CREATE TABLE IF NOT EXISTS `racuni` (
  `sifra` int(11) NOT NULL AUTO_INCREMENT,
  `sifra_zaposlenika` int(11) NOT NULL,
  `iznos` int(11) NOT NULL,
  `datum` datetime NOT NULL,
  PRIMARY KEY (`sifra`),
  KEY `sifra_zaposlenika` (`sifra_zaposlenika`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stavke`
--

DROP TABLE IF EXISTS `stavke`;
CREATE TABLE IF NOT EXISTS `stavke` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_racuna` int(11) NOT NULL,
  `id_artikla` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `opis` varchar(255) NOT NULL,
  `kolicina` int(11) NOT NULL,
  `ukupna_cijena` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_racuna` (`id_racuna`),
  KEY `id_artikla` (`id_artikla`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `zaposlenici`
--

DROP TABLE IF EXISTS `zaposlenici`;
CREATE TABLE IF NOT EXISTS `zaposlenici` (
  `sifra_zaposlenika` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `sifra` varchar(100) NOT NULL,
  `pozicija` int(5) NOT NULL,
  `deaktiviran` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`sifra_zaposlenika`),
  KEY `pozicija` (`pozicija`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zaposlenici`
--

INSERT INTO `zaposlenici` (`sifra_zaposlenika`, `ime`, `prezime`, `username`, `sifra`, `pozicija`, `deaktiviran`) VALUES
(1, 'Test', 'Test', 'test', 'test123', 1, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
