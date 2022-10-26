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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_name` varchar(250) NOT NULL,
  `owner_email` varchar(250) NOT NULL,
  `author` varchar(250) NOT NULL,
  `status` tinyint NOT NULL,
  `discription` varchar(500) DEFAULT NULL,
  `cover_url` varchar(250) DEFAULT NULL,
  `publish_date` date NOT NULL,
  PRIMARY KEY (`book_name`,`owner_email`),
  KEY `fk_owner_book_idx` (`owner_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES ('html 4','avimen@post.bgu.ac.il','זוהר עמיהוד',1,'לא קראתי','/images/book covers/html4.jpeg','2022-01-01'),('בדיקה 2','avimen@post.bgu.ac.il','אהלן אהלן',1,' ','/images/book covers/cover-בדיקה 2.png','2018-10-20'),('בדיקה א','avimen@post.bgu.ac.il','א.ב.ג.ד מנחם',1,' ','/images/book covers/cover-בדיקה א.png','2018-10-20'),('בשורות טובות','avimen@post.bgu.ac.il','טרי פראצ\'ט, ניל גיימן',1,'משעשע מאוד','/images/book covers/good news.jpeg','2022-01-01'),('האחים קראמזוב','avimen@post.bgu.ac.il','פיודור מיכאלוביץ\' דוסטוייבסקי',1,'','/images/book covers/the karamazov brothers.jpeg','2022-01-01'),('האידיוט המושלם','avimen@post.bgu.ac.il','אילן הייטנר',1,' ','/images/book covers/cover-האידיוט המושלם.jpg','2018-10-20'),('הארי פוטר ומסדר עוף החול','avimen@post.bgu.ac.il','ג\'יי קיי רולינג',0,'','/images/book covers/harry poter 4.jpeg','2022-01-01'),('ההוכחה והפרדוקס','avimen@post.bgu.ac.il','רבקה גולדסטיין',1,' ','/images/book covers/cover-ההוכחה והפרדוקס.jpg','2018-10-20'),('העיר והכלבים','avimen@post.bgu.ac.il','מריו ורגס יוסה',1,' ','/images/book covers/cover-העיר והכלבים.jpg','2018-10-20'),('כה אמר זרתוסטרה','avimen@post.bgu.ac.il','פרידריך ניטשה',0,'ספר לכל אחד ולאף אחד','/images/book covers/zaratustra.jpeg','2022-01-01'),('לא רציונלי אבל לא נורא','avimen@post.bgu.ac.il','דן אריאלי',1,' ','/images/book covers/cover-לא רציונלי אבל לא נורא.jpg','2018-10-20'),('להדליק מדורה','avimen@post.bgu.ac.il','ג\'ק לונדון',1,'סיפור הרפתקאה בערבות הקרח של אלסקה','/images/book covers/to light a fire.jpeg','2022-01-01'),('מלך החומוס ומלכת האמבטיה','avimen@post.bgu.ac.il','אילן הייטנר',1,' ','/images/book covers/cover-מלך החומוס ומלכת האמבטיה.jpg','2018-10-20'),('סוס אחד נכנס לבר','avimen@post.bgu.ac.il','דויד גרוסמן',0,'','/images/book covers/a horse walks into a bar.jpeg','2022-01-01'),('ענבי זעם','avimen@post.bgu.ac.il','ג\'ון סטיינבק',1,'','/images/book covers/rage grapes.jpeg','2022-01-01'),('קדמת עדן','avimen@post.bgu.ac.il','ג\'ון סטיינבק',1,'','/images/book covers/east of eden.jpeg','2022-01-01'),('קיצור תולדות האנושות','avimen@post.bgu.ac.il','יובל נוח הררי',1,' ','/images/book covers/cover-קיצור תולדות האנושות.jpg','2018-10-20'),('רציונליות, הוגנות, אושר','avimen@post.bgu.ac.il','דניאל כהנמן',0,'','/images/book covers/rationality, fairness, happyness.jpeg','2022-01-01'),('של עכברים ואנשים','avimen@post.bgu.ac.il','ג\'ון סטיינבק',0,'','/images/book covers/of mice and people.jpeg','2022-01-01'),('תקלה בקצה הגלקסיה','avimen@post.bgu.ac.il','אתגר קרת',1,'קצר וקולע','/images/book covers/error at the edge of the galaxy.jpeg','2022-01-01');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
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
