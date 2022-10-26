-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: weblibrary
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_requests`
--

DROP TABLE IF EXISTS `book_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_requests` (
  `user_asking` varchar(250) NOT NULL,
  `book_name` varchar(250) NOT NULL,
  `owner_email` varchar(250) NOT NULL,
  `time` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT 'ממתין',
  PRIMARY KEY (`user_asking`,`book_name`,`owner_email`),
  KEY `user_request_book_idx` (`owner_email`,`book_name`),
  CONSTRAINT `user_request_book` FOREIGN KEY (`owner_email`, `book_name`) REFERENCES `books` (`owner_email`, `book_name`),
  CONSTRAINT `user_request_user` FOREIGN KEY (`user_asking`) REFERENCES `users` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_requests`
--

LOCK TABLES `book_requests` WRITE;
/*!40000 ALTER TABLE `book_requests` DISABLE KEYS */;
INSERT INTO `book_requests` VALUES ('47@post.bgu.ac.ileaa','ההוכחה והפרדוקס','avimen@post.bgu.ac.il','2022-10-22 15:03:20','מאושר'),('47@post.bgu.ac.ileaa','העיר והכלבים','avimen@post.bgu.ac.il','2022-10-22 15:03:17','ממתין'),('47@post.bgu.ac.ileaa','לא רציונלי אבל לא נורא','avimen@post.bgu.ac.il','2022-10-22 15:03:15','ממתין'),('47@post.bgu.ac.ileaa','מלך החומוס ומלכת האמבטיה','avimen@post.bgu.ac.il','2022-10-22 15:03:13','ממתין'),('47@post.bgu.ac.ileaa','קיצור תולדות האנושות','avimen@post.bgu.ac.il','2022-10-22 15:03:11','ממתין'),('avimen@post.bgu.ac.il','העיר והכלבים','avimen@post.bgu.ac.il','2022-10-18 20:29:06','מבוטל'),('avimen@post.bgu.ac.il','כה אמר זרתוסטרה','avimen@post.bgu.ac.il','2022-10-17 16:32:39','מבוטל'),('avimen@post.bgu.ac.il','קדמת עדן','avimen@post.bgu.ac.il','2022-10-20 15:35:38','מבוטל'),('menachemavital3@gmail.com','html 4','avimen@post.bgu.ac.il','2022-10-17 15:16:55','מבוטל'),('menachemavital3@gmail.com','בשורות טובות','avimen@post.bgu.ac.il','2022-10-17 15:16:53','מבוטל'),('menachemavital3@gmail.com','האחים קראמזוב','avimen@post.bgu.ac.il','2022-10-17 15:16:51','מבוטל'),('menachemavital3@gmail.com','הארי פוטר ומסדר עוף החול','avimen@post.bgu.ac.il','2022-10-17 15:16:49','מבוטל'),('menachemavital3@gmail.com','כה אמר זרתוסטרה','avimen@post.bgu.ac.il','2022-10-17 15:16:48','מסורב');
/*!40000 ALTER TABLE `book_requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-26 11:55:23
