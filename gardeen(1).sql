
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gardeens`
--

-- --------------------------------------------------------



-- Link Volunteers to Gardens
ALTER TABLE Volunteers
ADD COLUMN garden_id INT,
ADD CONSTRAINT fk_garden
FOREIGN KEY (garden_id) REFERENCES gardens(id);

-- Link Crop Plans to Gardens
ALTER TABLE crop_plans
ADD COLUMN garden_id INT,
ADD CONSTRAINT fk_crop_garden
FOREIGN KEY (garden_id) REFERENCES gardens(id);

-- Link Resources to Gardens
ALTER TABLE resource
ADD COLUMN garden_id INT,
ADD CONSTRAINT fk_resource_garden
FOREIGN KEY (garden_id) REFERENCES gardens(id);


-- Link Weather to Gardens
ALTER TABLE weather
ADD COLUMN garden_id INT,
ADD CONSTRAINT fk_weather_garden
FOREIGN KEY (garden_id) REFERENCES gardens(id);

-- Link Local Partners to Crop Plans
ALTER TABLE crop_plans
ADD COLUMN partner_id INT,
ADD CONSTRAINT fk_crop_partner
FOREIGN KEY (partner_id) REFERENCES local_partners(id);

-- Link Resources to Volunteers
ALTER TABLE resource
ADD COLUMN volunteer_id INT,
ADD CONSTRAINT fk_resource_volunteer
FOREIGN KEY (volunteer_id) REFERENCES Volunteers(ID);

-- Link Guides to Local Partners
ALTER TABLE guides
ADD COLUMN partner_id INT,
ADD CONSTRAINT fk_guide_partner
FOREIGN KEY (partner_id) REFERENCES local_partners(id);

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

-- --------------------------------------------------------

--
-- بنية الجدول `guides`
--

CREATE TABLE `guides` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `publicationDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `guides`
--

INSERT INTO `guides` (`id`, `title`, `content`, `author`, `publicationDate`) VALUES
(1, 'How to Grow new thing!', 'This guide provides detailed instructions on how to grow newww...', 'Aisha', '2024-01-07'),
(3, 'Watering Tips for Your Garden', 'Proper watering techniques are essential for a healthy garden. This guide covers best practices for watering...', 'Mary Johnson', '2024-03-05'),
(4, 'Organic Pest Control', 'Discover natural methods for controlling pests in your garden without the use of harmful chemicals...', 'Peter Brown', '2024-04-20'),
(5, 'How to Grow Banana', 'This guide provides detailed instructions on how to grow banana...', 'Ayaa', '2024-01-08');


-- --------------------------------------------------------

--
-- بنية الجدول `Volunteers`
--

CREATE TABLE `Volunteers` (
  `ID` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `PhoneNumber` VARCHAR(20) NOT NULL,
  -- `GardenID` int(30) NOT NULL, --forign key
  `VolunteerDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `Volunteers`
--

INSERT INTO `Volunteers` (`ID`, `Name`, `PhoneNumber`, `VolunteerDate`) VALUES
(1, 'Arees', 0597373534, '2024-05-08');

INSERT INTO `Volunteers` (`ID`, `Name`, `PhoneNumber`, `VolunteerDate`) VALUES
(2, 'Ali', 0599823410, '2024-08-10');

INSERT INTO `Volunteers` (`ID`, `Name`, `PhoneNumber`, `VolunteerDate`, `garden_id`) VALUES
(3, 'Kinda', 0599863490, '2024-02-02', 3);
--
-- Indexes for dumped tables
--

-- --------------------------------------------------------

--
-- بنية الجدول `resource`
--

CREATE TABLE `resource` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `owner` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `resource` (`id`, `name`, `category`, `description`, `quantity`, `owner`) VALUES
(1, 'Garden Shovel2', 'tool', 'A sturdy garden shovel for digging and planting.', 5, 'Aisha Ishtayeh'),
(3, 'Watering Can', 'tool', 'Metal watering can with a long spout.', 10, 'Aya'),
(4, 'banana Seeds', 'seed', 'Heirloom banana seeds for planting.', 40, 'Riham');


-- --------------------------------------------------------

--
-- بنية الجدول `local_partners`
--

CREATE TABLE `local_partners` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(45) NOT NULL,
  `contact_info` varchar(150) NOT NULL,
  `date_added` date NOT NULL,
  `offerings` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `local_partners` (`id`, `name`, `type`, `description`, `location`, `contact_info`, `date_added`, `offerings`) VALUES
(1, 'Green Valley Nursery', 'Nursery', 'A local nursery offering a wide range of plants and gardening supplies.', '52-St, Nablus', 'Aya@gmail.com', '2024-01-19', 'Plants, Seeds, Gardening Tools, Workshops'),
(2, 'Sunny Farms', 'Farm', 'Organic farm producing fresh vegetables, fruits, and dairy products.', '20-st Salem', 'Aisha@gmail.com', '2024-04-11', 'Fruits, Vegetables, Farm Tours, Organic Products'),
(4, 'Green&Yallow Nursery', 'Nursery2', 'A local nursery offering a wide range of plants and gardening supplies.', '40-St, Nablus', 'Ayat@gmail.com', '2024-03-18', 'Plants, Seeds, Gardening Tools');


-- --------------------------------------------------------

--
-- بنية الجدول `soil_pest`
--

CREATE TABLE `soil_pest` (
  `id` int(11) NOT NULL,
  `soil_type` varchar(100) NOT NULL,
  `pest_name` varchar(100) NOT NULL,
  `pest_control_method` text NOT NULL,
  `additional_notes` text NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `soil_pest` (`id`, `soil_type`, `pest_name`, `pest_control_method`, `additional_notes`, `date_added`) VALUES
(1, 'Loamy', 'Aphids', 'Spray neem oil solution on affected plants.', 'Reapply every 7 days.', '2024-06-07'),
(2, 'Sandy', 'Spider Mites', 'Use insecticidal soap and water spray.', 'Check plants regularly.', '2024-06-07'),
(3, 'Clay', 'Whiteflies', 'Introduce natural predators like ladybugs.', 'Ensure plants are not over-watered.', '2024-06-07');



-- --------------------------------------------------------

--
-- بنية الجدول `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `temperature` float NOT NULL,
  `humidity` float NOT NULL,
  `precipitation` float NOT NULL,
  `wind_speed` float NOT NULL,
  `timestamp` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `weather` (`id`, `location`, `temperature`, `humidity`, `precipitation`, `wind_speed`, `timestamp`) VALUES
(1, 'Nablus', 27, 50, 0.2, 16, '2024-06-07'),
(2, 'Tubas', 35, 60, 0, 20, '2024-06-07'),
(3, 'Hebron', 36, 40, 0, 18, '2024-06-07');



CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `location` VARCHAR(100),
  `type` VARCHAR(50),
  `interest` VARCHAR(100),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

ALTER TABLE `crop_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gardens`
--
ALTER TABLE `gardens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guides`
--
ALTER TABLE `guides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`id`);
  
  --
-- Indexes for table `Volunteers`
--
ALTER TABLE `Volunteers`
  ADD PRIMARY KEY (`ID`);
  
--
-- Indexes for table `local_partners`
--
ALTER TABLE `local_partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `soil_pest`
--
ALTER TABLE `soil_pest`
  ADD PRIMARY KEY (`id`);
  
  --
-- Indexes for table `weather`
--
ALTER TABLE `weather`
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
--
-- AUTO_INCREMENT for table `guides`
--
ALTER TABLE `guides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `resource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `Volunteers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `local_partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `soil_pest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
