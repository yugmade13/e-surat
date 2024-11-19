-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: desa_kadilangu
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `counters`
--

DROP TABLE IF EXISTS `counters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counters` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `value` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counters`
--

LOCK TABLES `counters` WRITE;
/*!40000 ALTER TABLE `counters` DISABLE KEYS */;
INSERT INTO `counters` VALUES ('fff837ae-0add-44e6-bc04-486d12067cef',4,'2023-02-07 11:38:41','2023-02-09 14:21:31');
/*!40000 ALTER TABLE `counters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter_order`
--

DROP TABLE IF EXISTS `letter_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter_order` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `request_letter_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `letter_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pdf` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `request_letter_id` (`request_letter_id`),
  KEY `user_id` (`user_id`),
  KEY `letter_id` (`letter_id`),
  CONSTRAINT `letter_order_ibfk_1` FOREIGN KEY (`request_letter_id`) REFERENCES `letter_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `letter_order_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `letter_order_ibfk_3` FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter_order`
--

LOCK TABLES `letter_order` WRITE;
/*!40000 ALTER TABLE `letter_order` DISABLE KEYS */;
INSERT INTO `letter_order` VALUES ('42e02068-77d0-48f0-b0b2-1165a616707e','6a2764c4-f2e2-46c9-b62c-32dc5e7afe02','6570edc6-a81d-4eda-83f3-65dfeb70bde8','67b34d77-b9ce-4ec0-bba8-117d331743d3','92100a64036d6e3a6666de67411ebf4b','http://localhost:3300/pdf/92100a64036d6e3a6666de67411ebf4b.pdf','2023-02-07 18:43:25','2023-02-07 18:43:25'),('47d413dc-3242-49b9-a926-a6d50fe41025','ab536f05-c301-4b0a-be30-88dbab60934b','2c919aa0-5da5-45b3-992a-0fe02927a2d6','002af7e3-ab5c-471d-a8d0-f5489225985e','338be28f55cc4e6126048c202d3fe831','http://localhost:3300/pdf/338be28f55cc4e6126048c202d3fe831.pdf','2023-02-09 14:21:36','2023-02-09 14:21:36'),('8007d070-38f2-4731-b189-72bc479d9564','a0403cd1-204f-465e-ab1d-b08d113c8def','6570edc6-a81d-4eda-83f3-65dfeb70bde8','6107e650-ead2-4495-89cb-1dbb24331261','ab221ef5497f281d004a46e390372e25','http://localhost:3300/pdf/ab221ef5497f281d004a46e390372e25.pdf','2023-02-07 11:39:01','2023-02-07 11:39:01'),('a977d279-7352-400c-bdb4-d0008f8fa012','c52b149e-a87a-4920-a128-c2f6f1eb9d00','07f07bb8-c72c-4831-8fa1-5a14cea1caed','624d9ddf-414a-4ca8-8c3a-724d536ea0c7','f8bfa827f1d071394f5a5c2f798d620d','http://localhost:3300/pdf/f8bfa827f1d071394f5a5c2f798d620d.pdf','2023-02-07 11:38:47','2023-02-07 11:38:47');
/*!40000 ALTER TABLE `letter_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter_requests`
--

DROP TABLE IF EXISTS `letter_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter_requests` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `letter_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `note` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `letter_id` (`letter_id`),
  CONSTRAINT `letter_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `letter_requests_ibfk_2` FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter_requests`
--

LOCK TABLES `letter_requests` WRITE;
/*!40000 ALTER TABLE `letter_requests` DISABLE KEYS */;
INSERT INTO `letter_requests` VALUES ('6a2764c4-f2e2-46c9-b62c-32dc5e7afe02','6570edc6-a81d-4eda-83f3-65dfeb70bde8','67b34d77-b9ce-4ec0-bba8-117d331743d3','Saya ingin membuat Surat pengantar SKCK ke Kepolisian','2023-02-07 18:42:54','2023-02-07 18:42:54'),('a0403cd1-204f-465e-ab1d-b08d113c8def','6570edc6-a81d-4eda-83f3-65dfeb70bde8','6107e650-ead2-4495-89cb-1dbb24331261','Saya ingin membuat surat keterangan tidak mampu','2023-02-07 11:38:20','2023-02-07 11:38:20'),('ab536f05-c301-4b0a-be30-88dbab60934b','2c919aa0-5da5-45b3-992a-0fe02927a2d6','002af7e3-ab5c-471d-a8d0-f5489225985e','Gas Elpiji 3KG','2023-02-09 14:21:13','2023-02-09 14:21:13'),('c52b149e-a87a-4920-a128-c2f6f1eb9d00','07f07bb8-c72c-4831-8fa1-5a14cea1caed','624d9ddf-414a-4ca8-8c3a-724d536ea0c7','Saya ingin membuat surat keterangan domisili untuk diri sendiri','2023-02-07 11:37:38','2023-02-07 11:37:38');
/*!40000 ALTER TABLE `letter_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letters`
--

DROP TABLE IF EXISTS `letters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letters` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letters`
--

LOCK TABLES `letters` WRITE;
/*!40000 ALTER TABLE `letters` DISABLE KEYS */;
INSERT INTO `letters` VALUES ('002af7e3-ab5c-471d-a8d0-f5489225985e','Surat Keterangan Usaha','2023-02-06 20:06:55','2023-02-06 20:06:55'),('6107e650-ead2-4495-89cb-1dbb24331261','Surat Keterangan Tidak Mampu','2023-02-06 20:06:33','2023-02-06 20:06:33'),('624d9ddf-414a-4ca8-8c3a-724d536ea0c7','Surat Keterangan Domisili','2023-02-06 20:06:22','2023-02-06 20:06:22'),('67b34d77-b9ce-4ec0-bba8-117d331743d3','Surat Pengantar Pembuatan SKCK','2023-02-06 20:06:42','2023-02-06 20:06:42');
/*!40000 ALTER TABLE `letters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_to_everyone`
--

DROP TABLE IF EXISTS `request_to_everyone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_to_everyone` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `letter_request_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `no_kk` bigint NOT NULL,
  `nik` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `place_of_birth` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `religion` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL,
  `citizen` varchar(255) NOT NULL,
  `marital_status` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `letter_request_id` (`letter_request_id`),
  CONSTRAINT `request_to_everyone_ibfk_1` FOREIGN KEY (`letter_request_id`) REFERENCES `letter_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_to_everyone`
--

LOCK TABLES `request_to_everyone` WRITE;
/*!40000 ALTER TABLE `request_to_everyone` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_to_everyone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1-e2IwApKl8wTWRr5zEuiMq5NRduklMJ','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86114285,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:20:42','2023-02-09 14:20:42'),('1fklgKhTjIy-SPPij8ZEKuQLwghWi09B','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85803815,\"expires\":\"2023-02-08T11:34:49.546Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:44:45','2023-02-07 18:44:45'),('5LCNLdaQjwYKAPEhZGcvGPUxOAGbGFsZ','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86138568,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:40:03','2023-02-07 11:40:03'),('5ro2yTxT5VEZxbEMLMt8IGtFjuJcdpjQ','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85790822,\"expires\":\"2023-02-07T12:59:40.673Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:09:49','2023-02-06 20:09:49'),('5zyHP7A_RL7e2P_lpY6wgkimCScldUUK','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86080190,\"expires\":\"2023-02-10T07:15:56.908Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:21:16','2023-02-09 14:21:16'),('6t-PZLocW9v7Z0GiiAc8PB43vHY4eY60','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85987259,\"expires\":\"2023-02-07T12:59:40.676Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:06:33','2023-02-06 20:06:33'),('7auE65Ig-f86dDNEoU0C2S9HDYP30EXx','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86242332,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:38:20','2023-02-07 11:38:20'),('9CeUcRsdkdCFj9L6JAh3qIxPnpP8KzBT','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85803392,\"expires\":\"2023-02-07T12:59:40.672Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:09:37','2023-02-06 20:09:37'),('9fvbHZonTfgBM3g7AiVC1lZF1BhjH4GR','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86045453,\"expires\":\"2023-02-10T07:15:56.908Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:21:51','2023-02-09 14:21:51'),('AK2h9VnQESdAxKrukUPaMS5lgvd3_8hV','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85778829,\"expires\":\"2023-02-08T11:34:49.541Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:45:10','2023-02-07 18:45:10'),('aLv5XYFTxz_Va14PR1GNYBmvwrQfTiPd','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85889060,\"expires\":\"2023-02-08T11:34:49.541Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:43:20','2023-02-07 18:43:20'),('AOZvsDZLuKzPMY9QdsYGmbnioXtIUU2r','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":86067031,\"expires\":\"2023-02-07T12:59:40.671Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:05:13','2023-02-06 20:05:13'),('AYXwdqGw59E_mVj-I2ZXaiEMl5diwlLz','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85962439,\"expires\":\"2023-02-08T11:34:49.541Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:42:07','2023-02-07 18:42:07'),('BSBbzfxgKQrU4X1rUy2sh5L6OuH0YHGP','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86191411,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:39:11','2023-02-07 11:39:11'),('byq4zIc4NCvSbs10NDXzxkgTApY_GS9w','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85965332,\"expires\":\"2023-02-07T12:59:40.671Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:06:55','2023-02-06 20:06:55'),('CedOAmpaz1QbmaDgBfpMXgVfT50Bsz9O','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85796966,\"expires\":\"2023-02-08T11:34:49.541Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:44:52','2023-02-07 18:44:52'),('cisClY22Jh32ysuayevn5gKYCCrLzZJe','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85796335,\"expires\":\"2023-02-07T12:59:40.670Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:09:44','2023-02-06 20:09:44'),('CiZqx2m8N6nAax-141FLHNU4uqbRg8So','2023-02-10 14:16:09','{\"cookie\":{\"originalMaxAge\":85988074,\"expires\":\"2023-02-10T07:15:57.027Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"d243007f-e48d-4f99-8864-1b82aaa52a8b\"}','2023-02-09 14:22:48','2023-02-09 14:23:01'),('cyWJbUme97nBUQFI2--sk8ketC2rZPlk','2023-02-08 18:35:39','{\"cookie\":{\"originalMaxAge\":85788998,\"expires\":\"2023-02-08T11:34:49.658Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"d243007f-e48d-4f99-8864-1b82aaa52a8b\"}','2023-02-07 18:45:00','2023-02-07 18:45:50'),('DckwXGYv0mHiG6yIKudlgfEGGX6gX_XM','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85977959,\"expires\":\"2023-02-07T12:59:40.670Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:06:42','2023-02-06 20:06:42'),('eRzWMmGPANAsksQKWy6AJe7YEATvvTUJ','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86065266,\"expires\":\"2023-02-10T07:15:56.909Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:21:31','2023-02-09 14:21:31'),('f4Wh2UHeMR5pNkUBnqCvzF-MZ1ay6HTt','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":85995408,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:22:41','2023-02-09 14:22:41'),('fd-pY8CGOfc7CMa44NWStCONm1RmzVza','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85810168,\"expires\":\"2023-02-07T12:59:40.671Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:09:30','2023-02-06 20:09:30'),('GJITJQy2c8KXpaLN3zffooXHyQpVTQox','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86365013,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:16:31','2023-02-09 14:16:31'),('htG3Av2Qtb-ks-ym9CDZc7e7hj3dBx3Z','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86331182,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:36:51','2023-02-07 11:36:51'),('iRjJU1nAhXdiOzJUD5-Ju586Jukxex8a','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86272804,\"expires\":\"2023-02-08T04:35:42.508Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:37:49','2023-02-07 11:37:49'),('Iu9RMf4mhrDxKJUfJ8uMUA7TZUeRSnLR','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85998146,\"expires\":\"2023-02-07T12:59:40.671Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:06:22','2023-02-06 20:06:22'),('K8coHylcSo9dY78qDHNeYnzfGjtgvgzn','2023-02-07 19:59:30','{\"cookie\":{\"originalMaxAge\":86399581,\"expires\":\"2023-02-07T12:59:30.090Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 19:59:30','2023-02-06 19:59:30'),('KJ3_oSjWFCJdqko8bSC_1I6D2KfMlrNI','2023-03-12 17:56:24','{\"cookie\":{\"originalMaxAge\":86371616,\"expires\":\"2023-03-12T10:56:24.470Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-03-11 17:56:52','2023-03-11 17:56:52'),('KQf2JF-De0zCZEZWqwoDdgagphG_lysY','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86054909,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:21:42','2023-02-09 14:21:42'),('KwjbstA8bM8IqIt_5MYCCi4X8nXZlMGH','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85898527,\"expires\":\"2023-02-08T11:34:49.540Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:43:11','2023-02-07 18:43:11'),('L9qHqf68VltfmZuLNRmXGWxuA5BsuD4W','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86265247,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:37:57','2023-02-07 11:37:57'),('lBPU5aipecnNZXRFjbxIyBjRtpA2Jc5W','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":86139132,\"expires\":\"2023-02-07T12:59:40.676Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:04:01','2023-02-06 20:04:01'),('m7iH7Oc9FeNa_YQEjBM7KrvTUj42kOjX','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86341042,\"expires\":\"2023-02-08T04:35:42.508Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:36:41','2023-02-07 11:36:41'),('MUT4IGY7XGwepNppKZ616YM_JFmtMw1q','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86070792,\"expires\":\"2023-02-10T07:15:56.908Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:21:26','2023-02-09 14:21:26'),('MYGGr2ZhvOCYs5w9rtXleIKLtZ2kxDae','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86104060,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:20:52','2023-02-09 14:20:52'),('NA2bFouGCofVaibyBrGDswqGIt3DRr00','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86306391,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:17:30','2023-02-09 14:17:30'),('ncdSaEHEu9bLc7w7P5D3o2OSS-pwclKt','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86202301,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:39:00','2023-02-07 11:39:00'),('nRJ7ACD-ixTTOR2gup1R_wl1aNhPHELV','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":85988104,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:22:48','2023-02-09 14:22:48'),('NX5R_vXWVmas9v7p71-kr0OzK7o3XBPX','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85789021,\"expires\":\"2023-02-08T11:34:49.540Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:45:00','2023-02-07 18:45:00'),('OjXOHrJQvEhR_U9o57d3XDabCdc56noo','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86320051,\"expires\":\"2023-02-10T07:15:56.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:17:16','2023-02-09 14:17:16'),('ot5Zz3mO90Y6BU9H6D3oWvL320gCrZtS','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85853798,\"expires\":\"2023-02-08T11:34:49.541Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:43:55','2023-02-07 18:43:55'),('PdDOmdfSAgwpd4ulguaMON-Q5tDSwEI6','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":86268110,\"expires\":\"2023-02-07T12:59:40.673Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:01:52','2023-02-06 20:01:52'),('pfXNnfjLPB5Qoi4P6oExhE-I-pgEO8pr','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86374923,\"expires\":\"2023-02-10T07:15:56.908Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:16:22','2023-02-09 14:16:22'),('pge4BFT4-etu_3zeoGnoeoGJBeIYrKqi','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86221116,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:38:41','2023-02-07 11:38:41'),('pM9H6n20ETUQOY4p6o-60Q9UWwN4Yutx','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85862098,\"expires\":\"2023-02-08T11:34:49.541Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:43:47','2023-02-07 18:43:47'),('Q3eVt2LQTHQOF3wkvdCJIlMcTW5-7oFe','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":86056201,\"expires\":\"2023-02-07T12:59:40.670Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:05:24','2023-02-06 20:05:24'),('q3zVENOh63IZR55A3k5W2qk91rk0QXBx','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86283989,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:37:38','2023-02-07 11:37:38'),('qDbBN-07buUacbLPx5NNZTriDA_IlzpK','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86349206,\"expires\":\"2023-02-08T04:35:42.692Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:36:33','2023-02-07 11:36:33'),('QgLZcJypBiy65Mgi3CGPrSpmkLThfM76','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86230314,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:38:32','2023-02-07 11:38:32'),('RcGyoeE1bou_IgjSO5m0w-eP1aWCUmgO','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85914944,\"expires\":\"2023-02-08T11:34:49.540Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:42:54','2023-02-07 18:42:54'),('rowpKu9xkYrw1ZEgIzoVIctNd3XufqpW','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86181026,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:39:21','2023-02-07 11:39:21'),('TrUk13jm0xLbuZg_KRRV2c71Vv4saWJl','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86125443,\"expires\":\"2023-02-10T07:15:56.908Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:20:31','2023-02-09 14:20:31'),('uU9OhB1cNERhz6iaWp2JyUbEvLTfk8zG','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86146183,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:39:56','2023-02-07 11:39:56'),('v5yTRdr6NaqWdwW8LLoVRAjST0yDkUqV','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":86283986,\"expires\":\"2023-02-07T12:59:40.671Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:01:36','2023-02-06 20:01:36'),('VB4_xkLVFkk4ykRiP54E4WLRY5sB8Hwe','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":85976565,\"expires\":\"2023-02-10T07:15:56.908Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:23:00','2023-02-09 14:23:00'),('VlaAIzOxzGvq8Z-lbxmrqGa662ezsKSr','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86083123,\"expires\":\"2023-02-10T07:15:56.908Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:21:13','2023-02-09 14:21:13'),('vVQRmSP1GrOEi6OG6l0XaeAIjb2BsX9q','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":86328881,\"expires\":\"2023-02-07T12:59:40.680Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:00:52','2023-02-06 20:00:52'),('VzhMQG40AY491AhMI_gRGVKvZ-ghWLyO','2023-03-12 17:56:24','{\"cookie\":{\"originalMaxAge\":86396024,\"expires\":\"2023-03-12T10:56:24.474Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-03-11 17:56:28','2023-03-11 17:56:28'),('w7GZ2MV61IRdwmavnvqmv4gYa7bri5ac','2023-02-10 14:15:56','{\"cookie\":{\"originalMaxAge\":86389491,\"expires\":\"2023-02-10T07:15:56.921Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-09 14:16:08','2023-02-09 14:16:08'),('wMsjfaf0c16-ofCIqKEJm_BQwc_-XNdJ','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86209762,\"expires\":\"2023-02-08T04:35:42.507Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:38:52','2023-02-07 11:38:52'),('X3jEdqxDr8f14jGy1RSB3z2dKeqXJvdH','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85906720,\"expires\":\"2023-02-08T11:34:49.540Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:43:02','2023-02-07 18:43:02'),('X4KS398uG8A2V6G8L7kCqfp1rEiY_8sf','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":85894795,\"expires\":\"2023-02-07T12:59:40.671Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:08:05','2023-02-06 20:08:05'),('X8rsrbgju4bGKj6DOjNvOWKtZLvD48vG','2023-02-08 11:35:42','{\"cookie\":{\"originalMaxAge\":86239407,\"expires\":\"2023-02-08T04:35:42.508Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 11:38:23','2023-02-07 11:38:23'),('y4kPnrZlkckVC1zE-OX3fTJPLj20T_6a','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85952625,\"expires\":\"2023-02-08T11:34:49.540Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:42:16','2023-02-07 18:42:16'),('YJRIIuWJ2XLVp_Ucady7smGvM3LWBJHc','2023-02-08 18:34:49','{\"cookie\":{\"originalMaxAge\":85805700,\"expires\":\"2023-02-08T11:34:49.540Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-07 18:44:43','2023-02-07 18:44:43'),('Z-TJsuvI28wC0SLYynOZY0SAPYRnqGL-','2023-02-07 19:59:40','{\"cookie\":{\"originalMaxAge\":86140760,\"expires\":\"2023-02-07T12:59:40.671Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-02-06 20:03:59','2023-02-06 20:03:59');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `no_kk` bigint NOT NULL,
  `nik` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `place_of_birth` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `religion` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL,
  `citizen` varchar(255) NOT NULL,
  `marital_status` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nik` (`nik`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES ('2db3de51-08d6-4fe5-b4fc-7d9b6c96e625','07f07bb8-c72c-4831-8fa1-5a14cea1caed',3311100000000003,3311100000000004,'Yunna Adinda Arya Dewi','Sukoharjo','2023-02-02','P','Kadilangu RT 02 RW 03 Baki Sukoharjo','Islam','Mahasiswa/Pelajar','Indonesia','Belum Kawin','081222333444','2023-02-06 20:08:06','2023-02-06 20:08:06'),('479d65a7-70c1-4b93-8f0e-11f5e3340d37','6570edc6-a81d-4eda-83f3-65dfeb70bde8',3311100000000005,3311100000000006,'Mail','Surakarta','2023-02-03','L','Kadilangu RT 03 RW 03 Baki Sukoharjo','Islam','Wiraswasta','Indonesia','Kawin','081555666777','2023-02-06 20:09:30','2023-02-06 20:09:30'),('8e1343db-e69f-4bba-b778-7a03054e5d55','d243007f-e48d-4f99-8864-1b82aaa52a8b',3311100000000001,3311100000000002,'Yugma Dewangga','Sukoharjo','2023-02-01','L','Kadilangu RT 02 RW 03 Baki Sukoharjo','Islam','Mahasiswa/Pelajar','Indonesia','Belum Kawin','081225752685','2023-02-06 20:05:13','2023-02-06 20:05:13'),('c6047c9f-792b-4649-af6a-fb4491394570','2c919aa0-5da5-45b3-992a-0fe02927a2d6',3311100000000007,3311100000000008,'Jabrik','Sukoharjo','2023-02-01','L','Kadilangu RT 01 RW 01 Baki Sukoharjo','Islam','Wiraswasta','Indonesia','Kawin','081999888777','2023-02-09 14:20:31','2023-02-09 14:20:31');
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'unactive',
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('07f07bb8-c72c-4831-8fa1-5a14cea1caed','yunna@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$/UzGvWsNuSl5WSdQa1yowg$reH8hoDeDmF7hVkJDji0y0KK3c3thu5jpaAc2vCtzWI','active','user','2023-02-06 20:08:06','2023-02-06 20:08:06'),('2c919aa0-5da5-45b3-992a-0fe02927a2d6','jabrik@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$Q9o2n84Kz7t6OcbkknHGZg$9rQ5nZWsiJz54Jlb9upw/ZmhKLoobHKnwRXM83ZrZOs','active','user','2023-02-09 14:20:31','2023-02-09 14:20:31'),('6570edc6-a81d-4eda-83f3-65dfeb70bde8','mail@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$FjlsMAtGrUuh4f/VfGYO9g$+FxW06IG6/0TXtZ7pT/vsoTaKVR7+sknrBdZNsX4vVs','active','user','2023-02-06 20:09:30','2023-02-06 20:09:30'),('d243007f-e48d-4f99-8864-1b82aaa52a8b','yugmade@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$vmuUWmBSyY1Fc9aBGbQA+g$yKJvTkRVodW2MVIUN85T+krwMrATupx6tiNSxMgy8Jc','active','admin','2023-02-06 20:05:13','2023-02-06 20:05:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-14 21:27:10
