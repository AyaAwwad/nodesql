-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 30 مايو 2024 الساعة 12:10
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gardeen`
--

-- --------------------------------------------------------

--
-- بنية الجدول `crop_plans`
--

CREATE TABLE `crop_plans` (
  `id` int(11) NOT NULL,
  `cropType` varchar(200) NOT NULL,
  `plantingDate` date NOT NULL,
  `harvestDate` date NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `crop_plans`
--

INSERT INTO `crop_plans` (`id`, `cropType`, `plantingDate`, `harvestDate`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'Tomatoes', '2024-03-01', '2024-06-15', 'Planted in the north field, requires frequent watering.', '2024-05-22 21:35:25', '2024-05-22 21:35:25'),
(2, 'Cucumbers', '2024-03-15', '2024-07-10', 'Use trellis for support.', '2024-05-22 21:35:25', '2024-05-22 21:35:25'),
(3, 'Carrots', '2024-04-01', '2024-07-20', 'Deep soil preparation required.', '2024-05-22 21:35:25', '2024-05-22 21:35:25'),
(4, 'Lettuce', '2024-04-15', '2024-06-05', 'Shade required during hot days.', '2024-05-22 21:35:25', '2024-05-22 21:35:25');

-- --------------------------------------------------------

--
-- بنية الجدول `gardens`
--

CREATE TABLE `gardens` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `plotsAvailable` int(11) NOT NULL,
  `conditions` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `gardens`
--

INSERT INTO `gardens` (`id`, `name`, `location`, `plotsAvailable`, `conditions`) VALUES
(2, 'Nablus Garden', 'Nablus City', 10, 'Full sunlight'),
(3, 'Jamal Abdulnasser Garden', 'City Nablus ', 8, 'sandy soil'),
(7, 'Updated Name', '', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crop_plans`
--
ALTER TABLE `crop_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gardens`
--
ALTER TABLE `gardens`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crop_plans`
--
ALTER TABLE `crop_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `gardens`
--
ALTER TABLE `gardens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
