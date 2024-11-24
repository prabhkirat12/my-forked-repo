-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2024 at 04:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookingshoot`
--

CREATE TABLE `bookingshoot` (
  `bookingid` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `partnername` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `occasiontype` varchar(50) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `hoursofshoot` int(11) DEFAULT NULL,
  `contactnumber` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookingshoot`
--

INSERT INTO `bookingshoot` (`bookingid`, `id`, `name`, `partnername`, `email`, `occasiontype`, `datetime`, `address`, `latitude`, `longitude`, `timestamp`, `hoursofshoot`, `contactnumber`) VALUES
(1, 10, 'Bhavin Lodhiya', 'Janvi', 'boy123@gmail.com', 'engagement', '2024-09-30 13:38:00', '32, Roseville street, New Windsor', 0.00000000, 0.00000000, '2024-09-11 01:38:38', 5, 5),
(2, 10, 'Bhavin Lodhiya', 'Janvi', 'boy123@gmail.com', 'preWedding', '2024-09-27 14:17:00', '2 Holly Street, Avondale, Auckland, New Zealand', -36.89119770, 174.69368430, '2024-09-15 22:14:52', 15, 15);

-- --------------------------------------------------------

--
-- Table structure for table `contactme`
--

CREATE TABLE `contactme` (
  `cid` int(11) NOT NULL,
  `id` int(5) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contactnumbre` int(15) NOT NULL,
  `details` varchar(10000) NOT NULL,
  `date` datetime NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactme`
--

INSERT INTO `contactme` (`cid`, `id`, `email`, `contactnumbre`, `details`, `date`, `time`) VALUES
(12, 10, 'boy123@gmail.com', 225836996, '                            sveagefasd', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 11, 'ganeshan1234@gmail.com', 225836996, '                            new client added', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 10, 'boy123@gmail.com', 225836996, '                            price', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `imgid` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `imgpath` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`imgid`, `id`, `imgpath`) VALUES
(1, 7, '/uploads/image-1726409795803.JPG'),
(2, 7, '/uploads/image-1726438544287.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` varchar(15) NOT NULL DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `type`) VALUES
(7, 'bhavin', 'bhavin3180@gmail.com', '$2b$10$uh9y9hfKyEshzccsn.aeSuopHP0OCtCJkfEi6yrmFY.ri4nkbMCFO', 'admin'),
(10, 'bhavin1', 'boy123@gmail.com', '$2b$10$rk71VqePfO5i5/TQm/o8QOVeMMolS4fBJdrsRfpFS3HcBXFsXgAWu', 'client'),
(11, 'ganeshan', 'ganeshan1234@gmail.com', '$2b$10$c/vyBSg9LhBG/AhzoBdmE.t9G1pyx.Wm8/NdRsWicHZ.hjooCdhgC', 'client');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookingshoot`
--
ALTER TABLE `bookingshoot`
  ADD PRIMARY KEY (`bookingid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `contactme`
--
ALTER TABLE `contactme`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`imgid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookingshoot`
--
ALTER TABLE `bookingshoot`
  MODIFY `bookingid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contactme`
--
ALTER TABLE `contactme`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `imgid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookingshoot`
--
ALTER TABLE `bookingshoot`
  ADD CONSTRAINT `bookingshoot_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`);

--
-- Constraints for table `contactme`
--
ALTER TABLE `contactme`
  ADD CONSTRAINT `contactme_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
