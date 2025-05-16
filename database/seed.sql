-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 02:22 PM
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
-- Database: `lipa_tourism`
--

-- --------------------------------------------------------

--
-- Table structure for table `landmarks`
--

CREATE TABLE `landmarks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `landmarks`
--

INSERT INTO `landmarks` (`id`, `name`, `description`, `location`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Taal Volcano', 'An active volcano and a popular tourist destination.', 'Taal Lake, Batangas', 'Natural', '2025-05-11 10:30:38', '2025-05-11 10:30:38'),
(2, 'Lipa Cathedral', 'A historical cathedral known for its beautiful architecture.', 'Lipa City, Batangas', 'Cultural', '2025-05-11 10:30:38', '2025-05-11 10:30:38'),
(3, 'San Sebastian Cathedral', 'A famous church known for its unique architecture.', 'Lipa City, Batangas', 'Cultural', '2025-05-11 10:30:38', '2025-05-11 10:30:38'),
(4, 'Mount Malarayat', 'A mountain range popular for hiking and nature trips.', 'Lipa City, Batangas', 'Natural', '2025-05-11 10:30:38', '2025-05-11 10:30:38'),
(5, 'The Farm at San Benito', 'A wellness resort offering various health and wellness programs.', 'Lipa City, Batangas', 'Recreational', '2025-05-11 10:30:38', '2025-05-11 10:30:38'),
(6, 'San Sebastian Cathedral', 'Historical cathedral built in 1865', 'City Proper, Lipa', 'Churches', '2025-05-12 07:46:33', '2025-05-12 07:46:33'),
(7, 'Casa de Segunda', 'Historical house museum', 'Lipa City', 'Museums', '2025-05-12 07:46:33', '2025-05-12 07:46:33'),
(8, 'Mount Malarayat', 'Mountain range for hiking', 'Lipa City', 'Natural Attractions', '2025-05-12 07:46:33', '2025-05-12 07:46:33');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` int(11) NOT NULL,
  `landmark_id` int(11) DEFAULT NULL,
  `visit_date` date DEFAULT NULL,
  `visitor_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `landmark_id`, `visit_date`, `visitor_count`) VALUES
(1, 1, '2023-01-15', 150),
(2, 2, '2023-01-20', 200),
(3, 3, '2023-02-10', 100),
(4, 4, '2023-02-15', 75),
(5, 5, '2023-03-05', 50),
(6, 1, '2023-03-10', 120),
(7, 2, '2023-03-20', 180),
(8, 3, '2023-04-01', 90),
(9, 4, '2023-04-10', 60),
(10, 5, '2023-04-15', 40),
(11, 1, '2025-05-01', 150),
(12, 2, '2025-05-01', 75),
(13, 3, '2025-05-01', 100),
(14, 1, '2025-05-02', 200),
(15, 2, '2025-05-02', 80),
(16, 3, '2025-05-02', 120),
(17, 1, '2025-05-09', 100),
(18, 1, '2025-05-10', 120),
(19, 1, '2025-05-11', 140),
(20, 1, '2025-05-12', 160),
(21, 1, '2025-05-13', 180),
(22, 1, '2025-05-14', 200),
(23, 1, '2025-05-15', 220),
(24, 2, '2025-04-15', 300),
(25, 2, '2025-03-15', 350),
(26, 3, '2025-02-15', 400),
(27, 3, '2024-05-15', 500);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `landmarks`
--
ALTER TABLE `landmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `landmark_id` (`landmark_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `landmarks`
--
ALTER TABLE `landmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`landmark_id`) REFERENCES `landmarks` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
