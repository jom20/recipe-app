-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2023 at 01:28 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbrecipe`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `image`, `description`) VALUES
(14, 'Adobo', 'images/chicken_image.jpg', 'Adobong Pinoy'),
(15, 'Fried Chicken', 'images/fried-chicken.jpg', 'Fried Chicken Pinoy'),
(17, 'Menudo', 'images/menudo.jpg', 'Menudong pinoy'),
(18, 'Crispy Pata', 'images/crispy_pata.jpg', 'Crunchy pork skin enclosing savory tender meat'),
(19, 'Salad Delish', 'images/salad-delish.jpg', 'Mixed with fruits and vegetable also ,mixtures of various ingredients accompanied by a sauce or dressing'),
(20, 'Chicken Afritada', 'images/Chicken Afritada.jpg', 'Filipino chicken stew with tomato based sauced. It is a simple dish that can be cooked on regular days.'),
(21, 'Fish Ball', 'images/fish_ball.jpg', 'Filipino recipe that is an edible, ball-shaped patty made of pulverized fish');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
