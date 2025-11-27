CREATE DATABASE  IF NOT EXISTS `pulseit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `pulseit`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pulseit
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `asignacion`
--

DROP TABLE IF EXISTS `asignacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacion` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_ticket` bigint(20) unsigned NOT NULL,
  `id_usuario_tecnico` int(10) unsigned NOT NULL,
  `id_usuario_asignador` int(10) unsigned DEFAULT NULL,
  `id_regla_autotriage` int(10) unsigned DEFAULT NULL,
  `fecha_asignacion` datetime DEFAULT current_timestamp(),
  `metodo` enum('automatico','manual') NOT NULL,
  `puntuacion` float DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `id_usuario_asignador` (`id_usuario_asignador`),
  KEY `idx_asign_ticket` (`id_ticket`),
  KEY `idx_asign_tecnico` (`id_usuario_tecnico`),
  KEY `fk_asignacion_regla_autotriage` (`id_regla_autotriage`),
  CONSTRAINT `asignacion_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`),
  CONSTRAINT `asignacion_ibfk_2` FOREIGN KEY (`id_usuario_tecnico`) REFERENCES `usuario` (`id`),
  CONSTRAINT `asignacion_ibfk_3` FOREIGN KEY (`id_usuario_asignador`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_asignacion_regla_autotriage` FOREIGN KEY (`id_regla_autotriage`) REFERENCES `reglas_autotriage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacion`
--

LOCK TABLES `asignacion` WRITE;
/*!40000 ALTER TABLE `asignacion` DISABLE KEYS */;
INSERT INTO `asignacion` VALUES (1,1,3,5,1,'2025-10-15 10:48:26','automatico',NULL,'Asignado automáticamente por prioridad alta (software clínico).',1),(2,2,4,5,1,'2025-10-15 10:48:26','automatico',NULL,'Asignado automáticamente por regla de equipos tecnológicos.',1),(3,3,3,5,2,'2025-10-15 10:48:26','automatico',NULL,'Asignado por carga y especialidad de redes.',1),(4,4,4,5,NULL,'2025-10-15 10:48:26','manual',NULL,'Asignado manualmente por administrador.',1),(5,5,3,5,NULL,'2025-10-16 11:09:49','manual',NULL,'Ejemplo de ticket resuelto para la vista semanal.',1),(6,7,4,5,NULL,'2025-10-30 12:46:21','manual',NULL,'Asignado manualmente por el administrador.',1),(7,8,4,5,NULL,'2025-10-30 14:35:36','manual',NULL,'Asignado manualmente por el administrador.',1),(8,9,4,5,NULL,'2025-10-30 14:46:03','manual',NULL,'Asignado manualmente a técnico.',1),(9,23,12,5,NULL,'2025-11-25 14:57:47','manual',NULL,'Asignado manualmente por el administrador.',1),(10,25,4,5,NULL,'2025-11-25 21:26:19','manual',NULL,'Asignado manualmente por el administrador.',1),(11,26,15,5,NULL,'2025-11-25 21:36:31','manual',NULL,'Asignado manualmente por el administrador.',1),(12,27,3,5,NULL,'2025-11-26 14:18:31','manual',NULL,'Se asigna manualmente desde postman para prueba',1),(13,10,12,5,NULL,'2025-11-27 15:47:30','manual',NULL,'Es el tecnico mas adecuado para el proceso',1);
/*!40000 ALTER TABLE `asignacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_sla` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_sla` (`id_sla`),
  CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`id_sla`) REFERENCES `sla` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Software Clínico','Incidentes relacionados con el software clínico del hospital.',1),(2,'Hardware y Equipos Tecnológicos','Problemas con hardware o equipos tecnológicos.',2),(3,'Redes y Conectividad','Fallas en la red interna o conectividad Wi-Fi.',3),(4,'Soporte a Usuario Interno','Soporte a usuarios internos del sistema.',4),(6,'Control Ambiental','Soporte a sensores y dispositivos de temperatura',6),(7,'Gestión de accesos y roles en sistemas clínicos','Gestión de accesos y roles en sistemas clínicos',7),(8,'Fallas en conexión Wi-Fi de áreas medicas','Gestión de pérdida de conectividad Wi-Fi en zonas médicas ',4);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_especialidad`
--

DROP TABLE IF EXISTS `categoria_especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_especialidad` (
  `id_categoria` int(10) unsigned NOT NULL,
  `id_especialidad` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_categoria`,`id_especialidad`),
  KEY `id_especialidad` (`id_especialidad`),
  CONSTRAINT `categoria_especialidad_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `categoria_especialidad_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_especialidad`
--

LOCK TABLES `categoria_especialidad` WRITE;
/*!40000 ALTER TABLE `categoria_especialidad` DISABLE KEYS */;
INSERT INTO `categoria_especialidad` VALUES (1,1),(1,2),(1,3),(2,4),(2,5),(2,6),(3,7),(3,8),(3,9),(4,10),(4,11),(4,12),(6,4),(6,6),(7,1),(7,11),(7,12),(8,7),(8,8),(8,9);
/*!40000 ALTER TABLE `categoria_especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_etiqueta`
--

DROP TABLE IF EXISTS `categoria_etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_etiqueta` (
  `id_categoria` int(10) unsigned NOT NULL,
  `id_etiqueta` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_categoria`,`id_etiqueta`),
  KEY `id_etiqueta` (`id_etiqueta`),
  CONSTRAINT `categoria_etiqueta_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `categoria_etiqueta_ibfk_2` FOREIGN KEY (`id_etiqueta`) REFERENCES `etiqueta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_etiqueta`
--

LOCK TABLES `categoria_etiqueta` WRITE;
/*!40000 ALTER TABLE `categoria_etiqueta` DISABLE KEYS */;
INSERT INTO `categoria_etiqueta` VALUES (1,1),(1,2),(1,3),(1,4),(2,5),(2,6),(2,7),(2,8),(3,9),(3,10),(3,11),(3,12),(4,13),(4,14),(4,15),(4,16),(6,6),(6,8),(7,13),(7,14),(7,16),(8,5),(8,9),(8,10);
/*!40000 ALTER TABLE `categoria_etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'Soporte de software médico','Mantenimiento y actualización de sistemas clínicos.'),(2,'Administración de bases de datos','Gestión y respaldo de datos clínicos.'),(3,'Integración de sistemas clínicos','Conexión entre módulos y dispositivos médicos.'),(4,'Técnico en reparación','Reparación de equipos tecnológicos.'),(5,'Electrónica médica','Mantenimiento de equipos médicos electrónicos.'),(6,'Mantenimiento preventivo/correctivo','Soporte técnico general de hardware.'),(7,'Administración de redes','Configuración y mantenimiento de redes.'),(8,'Telecomunicaciones','Gestión de comunicaciones internas y externas.'),(9,'Seguridad de red','Protección de la infraestructura de red.'),(10,'Administración de sistemas','Gestión de sistemas operativos y servidores.'),(11,'Directorios activos','Manejo de usuarios y permisos en red.'),(12,'Atención al usuario','Soporte general al personal interno.');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados_ticket`
--

DROP TABLE IF EXISTS `estados_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados_ticket` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados_ticket`
--

LOCK TABLES `estados_ticket` WRITE;
/*!40000 ALTER TABLE `estados_ticket` DISABLE KEYS */;
INSERT INTO `estados_ticket` VALUES (1,'Asignado','ticket asignado'),(2,'En Proceso','Asignado a un técnico'),(3,'Cerrado','Resuelto o finalizado'),(4,'Pendiente','Ticket creado y esperando asignación'),(5,'Resuelto','Ticket atendido y pendiente de validación del cliente');
/*!40000 ALTER TABLE `estados_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiqueta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
INSERT INTO `etiqueta` VALUES (16,'Acceso a sistemas'),(3,'Agenda de pacientes'),(11,'Cableado'),(9,'Conexión de red'),(15,'Configuración de correo'),(13,'Creación de usuario'),(8,'Equipos médicos conectados'),(6,'Estación de trabajo'),(1,'Historia clínica'),(7,'Impresora'),(2,'Laboratorio'),(4,'PACS / RIS (Imágenes Médicas)'),(14,'Restablecer contraseña'),(5,'Servidor'),(12,'VPN interna'),(10,'Wi-Fi');
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_tickets`
--

DROP TABLE IF EXISTS `historial_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_tickets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_ticket` bigint(20) unsigned NOT NULL,
  `id_estado_anterior` int(10) unsigned DEFAULT NULL,
  `id_estado_nuevo` int(10) unsigned NOT NULL,
  `id_usuario_cambio` int(10) unsigned NOT NULL,
  `fecha_cambio` datetime DEFAULT current_timestamp(),
  `observaciones` text DEFAULT NULL,
  `id_asignacion` bigint(20) unsigned DEFAULT NULL,
  `es_sistema` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `id_estado_anterior` (`id_estado_anterior`),
  KEY `id_usuario_cambio` (`id_usuario_cambio`),
  KEY `id_asignacion` (`id_asignacion`),
  KEY `idx_hist_ticket` (`id_ticket`),
  KEY `idx_hist_estado` (`id_estado_nuevo`),
  CONSTRAINT `historial_tickets_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`),
  CONSTRAINT `historial_tickets_ibfk_2` FOREIGN KEY (`id_estado_anterior`) REFERENCES `estados_ticket` (`id`),
  CONSTRAINT `historial_tickets_ibfk_3` FOREIGN KEY (`id_estado_nuevo`) REFERENCES `estados_ticket` (`id`),
  CONSTRAINT `historial_tickets_ibfk_4` FOREIGN KEY (`id_usuario_cambio`) REFERENCES `usuario` (`id`),
  CONSTRAINT `historial_tickets_ibfk_5` FOREIGN KEY (`id_asignacion`) REFERENCES `asignacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_tickets`
--

LOCK TABLES `historial_tickets` WRITE;
/*!40000 ALTER TABLE `historial_tickets` DISABLE KEYS */;
INSERT INTO `historial_tickets` VALUES (1,1,NULL,1,1,'2025-10-15 10:48:26','Ticket creado por el cliente.',NULL,0),(2,1,1,2,5,'2025-10-15 10:48:26','Administrador asignó al técnico Luis.',NULL,1),(3,2,NULL,1,2,'2025-10-15 10:48:26','Cliente abrió un nuevo ticket.',NULL,0),(4,2,1,2,5,'2025-10-15 10:48:26','Administrador asignó a Sofía.',NULL,1),(5,3,NULL,1,1,'2025-10-15 10:48:26','Ticket de conectividad abierto.',NULL,0),(6,3,1,2,5,'2025-10-15 10:48:26','Técnico asignado automáticamente.',NULL,1),(7,4,NULL,1,2,'2025-10-15 10:48:26','Ticket de soporte interno abierto.',NULL,0),(8,7,NULL,4,6,'2025-10-30 12:37:57','Cliente creó el ticket en estado Pendiente.',NULL,0),(9,7,4,1,5,'2025-10-30 12:41:19','Administrador abrió el ticket.',NULL,0),(10,7,1,2,3,'2025-10-30 12:48:45','Técnico inicia trabajo.',NULL,0),(11,7,2,5,3,'2025-10-30 13:54:13','Técnico resolvió el ticket.',NULL,0),(12,7,5,3,6,'2025-10-30 13:56:42','Cliente revisó la solución y cerró el ticket.',NULL,0),(13,8,NULL,4,6,'2025-10-30 14:14:08','Cliente creó el ticket en estado Pendiente.',NULL,0),(14,8,4,1,5,'2025-10-30 14:34:39','Administrador abrió el ticket.',NULL,0),(15,8,1,2,3,'2025-10-30 14:38:07','Técnico inicia trabajo.',NULL,0),(16,8,2,5,4,'2025-10-30 14:39:39','Técnico resolvió el ticket.',NULL,0),(17,9,NULL,4,6,'2025-10-30 14:44:52','Cliente creó el ticket con estado Pendiente.',NULL,0),(18,9,4,1,5,'2025-10-30 14:45:35','Administrador abrió el ticket.',NULL,0),(19,9,1,2,4,'2025-10-30 14:49:41','Técnico inicia el diagnóstico.',NULL,0),(20,10,NULL,4,2,'2025-10-30 16:14:35','Cliente creó el ticket con estado Pendiente.',NULL,0),(21,11,NULL,4,2,'2025-10-31 09:16:14','Cliente creó el ticket con estado Pendiente.',NULL,0),(30,22,NULL,4,4,'2025-11-25 10:29:27','Cliente creó el ticket con estado Pendiente.',NULL,0),(31,22,1,2,3,'2025-11-25 13:23:41','Se cambia el estado del ticket Prueba BACKEND',NULL,0),(32,22,2,5,3,'2025-11-25 14:07:05','Se cambia el estado del ticket a resuelto Prueba BACKEND',NULL,0),(33,22,5,3,5,'2025-11-25 14:09:09','Se cambia el estado del ticket a CERRADO Prueba BACKEND',NULL,0),(34,23,NULL,4,2,'2025-11-25 14:53:41','Cliente creó el ticket con estado Pendiente.',NULL,0),(35,23,4,1,5,'2025-11-25 14:56:37','Administrador asigno el ticket.',NULL,0),(36,23,1,2,12,'2025-11-25 15:04:34','Empece con la revision de las conexiones. En proceso',NULL,0),(37,23,2,5,12,'2025-11-25 15:09:57','Ticket resuelto. Problema con las conexiones internas solucionado',NULL,0),(38,23,5,3,2,'2025-11-25 15:12:52','El ticket esta resuelto a tiempo',NULL,0),(39,24,NULL,4,1,'2025-11-25 19:04:10','Cliente creó el ticket con estado Pendiente.',NULL,0),(40,5,5,3,5,'2025-11-25 21:14:32','El tecnico ha finalizado con el ticket ',NULL,0),(41,8,5,3,5,'2025-11-25 21:15:13','El tecnico ha resuelto el ticket ',NULL,0),(42,25,NULL,4,1,'2025-11-25 21:23:14','Cliente creó el ticket con estado Pendiente.',NULL,0),(43,25,4,1,5,'2025-11-25 21:25:40','Administrador abrió el ticket.',NULL,0),(44,25,1,2,4,'2025-11-25 21:28:47','Empece con el trabajo. en proceso',NULL,0),(45,26,NULL,4,2,'2025-11-25 21:34:30','Cliente creó el ticket con estado Pendiente.',NULL,0),(46,26,4,1,5,'2025-11-25 21:35:29','Administrador abrió el ticket.',NULL,0),(47,26,1,2,15,'2025-11-25 21:39:01','En proceso de resolucion',NULL,0),(48,26,2,5,15,'2025-11-25 21:39:40','Ticket resuelto',NULL,0),(49,26,5,3,2,'2025-11-25 21:41:01','Cerrado',NULL,0),(50,27,NULL,4,3,'2025-11-26 14:13:26','Cliente creó el ticket con estado Pendiente.',NULL,0),(51,27,4,1,5,'2025-11-26 14:18:31','Pasa a ser asignado',NULL,0),(52,10,4,1,5,'2025-11-27 15:47:30','Asignar para prueba',NULL,0);
/*!40000 ALTER TABLE `historial_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_historial_tickets`
--

DROP TABLE IF EXISTS `imagenes_historial_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes_historial_tickets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_historial` bigint(20) unsigned NOT NULL,
  `nombre_archivo` varchar(255) NOT NULL,
  `ruta` varchar(512) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `tamano_bytes` int(11) NOT NULL,
  `id_usuario` int(10) unsigned DEFAULT NULL,
  `fecha_subida` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_historial` (`id_historial`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `imagenes_historial_tickets_ibfk_1` FOREIGN KEY (`id_historial`) REFERENCES `historial_tickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `imagenes_historial_tickets_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_historial_tickets`
--

LOCK TABLES `imagenes_historial_tickets` WRITE;
/*!40000 ALTER TABLE `imagenes_historial_tickets` DISABLE KEYS */;
INSERT INTO `imagenes_historial_tickets` VALUES (1,1,'error_historia.png','/uploads/1/error_historia.png','image/png',250000,1,'2025-10-15 10:48:26'),(2,3,'equipo_medico.png','/uploads/2/equipo_medico.png','image/png',180000,2,'2025-10-15 10:48:26'),(3,5,'wifi_down.png','/uploads/3/wifi_down.png','image/png',200000,1,'2025-10-15 10:48:26'),(4,17,'falloImpresora.png','http://localhost:81/PulseIT/api/uploads/falloImpresora.png','png',276783,6,'2025-10-30 15:46:33'),(5,19,'procesoImpresora.png','http://localhost:81/PulseIT/api/uploads/procesoImpresora.png','png',276783,4,'2025-10-30 15:50:52'),(14,30,'evidencia_6925d967ad3ec.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6925d967ad3ec.png','',573932,4,'2025-11-25 10:29:27'),(15,30,'evidencia_6925d967ae000.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6925d967ae000.png','',836783,4,'2025-11-25 10:29:27'),(16,34,'evidencia_6926175614a28.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6926175614a28.png','',175531,2,'2025-11-25 14:53:42'),(17,36,'evidencia_692619e2df147.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692619e2df147.png','',343364,12,'2025-11-25 15:04:34'),(18,37,'evidencia_69261b264ba4b.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69261b264ba4b.png','',103402,12,'2025-11-25 15:09:58'),(19,37,'evidencia_69261b26504a0.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69261b26504a0.png','',46003,12,'2025-11-25 15:09:58'),(20,38,'evidencia_69261bd475f56.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69261bd475f56.png','',15047,2,'2025-11-25 15:12:52'),(21,39,'evidencia_6926520ad526e.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6926520ad526e.png','',83133,1,'2025-11-25 19:04:10'),(22,41,'evidencia_692670c2117eb.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692670c2117eb.png','',3585,5,'2025-11-25 21:15:14'),(23,42,'evidencia_692672a366d6c.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692672a366d6c.png','',2050175,1,'2025-11-25 21:23:15'),(24,44,'evidencia_692673ef9dfb3.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692673ef9dfb3.png','',178331,4,'2025-11-25 21:28:47'),(25,45,'evidencia_6926754726278.jpg',' http://localhost:81/PulseIT/api/uploads/evidencia_6926754726278.jpg','',18220,2,'2025-11-25 21:34:31'),(26,47,'evidencia_69267655d7598.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69267655d7598.png','',573932,15,'2025-11-25 21:39:01'),(27,48,'evidencia_6926767d2a3ba.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6926767d2a3ba.png','',836783,15,'2025-11-25 21:39:41'),(28,50,'evidencia_69275f6737e3d.jpeg',' http://localhost:81/PulseIT/api/uploads/evidencia_69275f6737e3d.jpeg','',188977,3,'2025-11-26 14:13:27'),(29,52,'evidencia_6928c6f339e22.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6928c6f339e22.png','',1492,5,'2025-11-27 15:47:31');
/*!40000 ALTER TABLE `imagenes_historial_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int(10) unsigned NOT NULL,
  `tipo_id` int(10) unsigned NOT NULL,
  `id_usuario_origen` int(10) unsigned DEFAULT NULL,
  `contenido` text NOT NULL,
  `atendida` tinyint(1) DEFAULT 0,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_usuario_origen` (`id_usuario_origen`),
  KEY `tipo_id` (`tipo_id`),
  CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `notificacion_ibfk_2` FOREIGN KEY (`id_usuario_origen`) REFERENCES `usuario` (`id`),
  CONSTRAINT `notificacion_ibfk_3` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_notificacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
INSERT INTO `notificacion` VALUES (1,3,3,5,'{\"mensaje\": \"Se te asignó el ticket 1\"}',0,'2025-10-14 12:08:42'),(2,1,2,5,'{\"mensaje\": \"Tu ticket cambió a En Proceso\"}',1,'2025-10-14 12:08:42'),(3,2,1,5,'{\"mensaje\": \"Se creó tu ticket exitosamente\"}',0,'2025-10-14 12:08:42'),(5,1,4,5,'Esta notificacion es de prueba',0,'2025-11-25 18:50:59'),(6,1,1,5,'Ticket creado #24 - Sistema de inventario no responde ',0,'2025-11-25 19:04:11'),(7,1,1,5,'Ticket creado #25 - Prueba para notis',0,'2025-11-25 21:23:16'),(8,1,2,4,'',0,'2025-11-25 21:28:48'),(9,2,1,5,'Ticket creado #26 - Gotera en el techo del lab',0,'2025-11-25 21:34:32'),(10,2,2,15,'Ticket puesto en proceso',0,'2025-11-25 21:39:02'),(11,2,2,15,'El Ticket se ha resuelto',0,'2025-11-25 21:39:42'),(12,3,1,5,'Ticket creado #27 - prueba para la asignacion',0,'2025-11-26 14:13:28'),(13,12,3,5,'Se te ha asignado un nuevo ticket:Cables de conexion no responden',0,'2025-11-27 15:47:32');
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reglas_autotriage`
--

DROP TABLE IF EXISTS `reglas_autotriage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reglas_autotriage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `peso_prioridad` float DEFAULT 1,
  `peso_tiempo_restante` float DEFAULT 1,
  `peso_carga` float DEFAULT 1,
  `id_usuario_creador` int(10) unsigned DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario_creador` (`id_usuario_creador`),
  CONSTRAINT `reglas_autotriage_ibfk_1` FOREIGN KEY (`id_usuario_creador`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reglas_autotriage`
--

LOCK TABLES `reglas_autotriage` WRITE;
/*!40000 ALTER TABLE `reglas_autotriage` DISABLE KEYS */;
INSERT INTO `reglas_autotriage` VALUES (1,'Regla Prioridad Alta','Tickets críticos se asignan primero.',1,1.5,1.2,1,5,'2025-10-14 12:08:42'),(2,'Regla Balanceada','Distribuye según carga y prioridad.',1,1,1,1,5,'2025-10-14 12:08:42');
/*!40000 ALTER TABLE `reglas_autotriage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (3,'Administrador'),(1,'Cliente'),(2,'Técnico');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sla`
--

DROP TABLE IF EXISTS `sla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sla` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tiempo_respuesta_minutos` int(11) NOT NULL,
  `tiempo_resolucion_minutos` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sla`
--

LOCK TABLES `sla` WRITE;
/*!40000 ALTER TABLE `sla` DISABLE KEYS */;
INSERT INTO `sla` VALUES (1,'SLA Software Clínico',120,480),(2,'SLA Hardware y Equipos Tecnológicos',240,1440),(3,'SLA Redes y Conectividad',60,360),(4,'SLA Soporte a Usuario Interno',60,240),(6,'SLA Ambiental',45,180),(7,'SLA Gestión de Accesos Clínicos',45,125);
/*!40000 ALTER TABLE `sla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tecnico_especialidad`
--

DROP TABLE IF EXISTS `tecnico_especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tecnico_especialidad` (
  `id_usuario_tecnico` int(10) unsigned NOT NULL,
  `id_especialidad` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_usuario_tecnico`,`id_especialidad`),
  KEY `id_especialidad` (`id_especialidad`),
  CONSTRAINT `tecnico_especialidad_ibfk_1` FOREIGN KEY (`id_usuario_tecnico`) REFERENCES `usuario` (`id`),
  CONSTRAINT `tecnico_especialidad_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnico_especialidad`
--

LOCK TABLES `tecnico_especialidad` WRITE;
/*!40000 ALTER TABLE `tecnico_especialidad` DISABLE KEYS */;
INSERT INTO `tecnico_especialidad` VALUES (3,7),(3,8),(3,9),(3,10),(4,4),(4,5),(4,6),(4,12),(8,4),(8,6),(8,7),(9,4),(9,5),(9,6),(10,1),(10,2),(12,7),(12,8),(12,9),(15,10),(15,11),(15,12);
/*!40000 ALTER TABLE `tecnico_especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `prioridad` tinyint(4) NOT NULL DEFAULT 3,
  `id_categoria` int(10) unsigned DEFAULT NULL,
  `id_usuario_solicitante` int(10) unsigned NOT NULL,
  `id_estado_actual` int(10) unsigned NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_limite_respuesta` datetime DEFAULT NULL,
  `fecha_limite_resolucion` datetime DEFAULT NULL,
  `respuesta_cumplida` tinyint(1) DEFAULT NULL,
  `resolucion_cumplida` tinyint(1) DEFAULT NULL,
  `fecha_cierre` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ticket_categoria` (`id_categoria`),
  KEY `idx_ticket_solicitante` (`id_usuario_solicitante`),
  KEY `idx_ticket_estado` (`id_estado_actual`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`id_usuario_solicitante`) REFERENCES `usuario` (`id`),
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`id_estado_actual`) REFERENCES `estados_ticket` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'Error en módulo de historia clínica','El sistema no guarda correctamente los registros médicos.',2,1,1,1,'2025-10-15 10:48:26','2025-10-15 12:48:26','2025-10-15 18:48:26',NULL,NULL,NULL),(2,'Monitor de signos vitales no enciende','El equipo médico no responde al encenderlo.',1,2,2,1,'2025-10-15 10:48:26','2025-10-15 14:48:26','2025-10-16 10:48:26',NULL,NULL,NULL),(3,'Pérdida de conexión Wi-Fi en consultorios','Los consultorios 3 y 4 no tienen acceso a la red Wi-Fi institucional.',3,3,1,1,'2025-10-15 10:48:26','2025-10-15 11:48:26','2025-10-15 16:48:26',NULL,NULL,NULL),(4,'No puedo ingresar al sistema','El usuario no puede acceder al sistema interno del hospital.',2,4,2,1,'2025-10-15 10:48:26','2025-10-15 11:48:26','2025-10-15 14:48:26',NULL,NULL,NULL),(5,'Actualización de software de laboratorio','El sistema de control de muestras requiere una actualización de versión para resolver un bug.',2,1,1,3,'2025-10-16 11:09:40','2025-10-16 13:09:40','2025-10-16 19:09:40',NULL,NULL,'2025-11-25 21:14:32'),(7,'Solicitud de instalación de software','Se requiere instalar software en nuevo equipo',2,1,6,3,'2025-10-30 12:23:16','2025-10-30 14:23:16','2025-10-30 20:23:16',1,1,'2025-10-30 13:56:42'),(8,'Error en acceso remoto','No se puede acceder al sistema desde casa.',2,4,6,3,'2025-10-30 14:13:32','2025-10-30 16:13:32','2025-10-30 22:13:32',NULL,NULL,'2025-11-25 21:15:13'),(9,'Revision de impresora sala 2B','Impresora no esta funcionando',1,2,6,2,'2025-10-30 14:44:16','2025-10-30 16:44:16','2025-10-30 22:44:16',NULL,NULL,NULL),(10,'Cables de conexion no responden','Los cables UTP del laboratorio 9-1 no funcionan',3,3,2,1,'2025-10-30 16:12:05','2025-10-30 18:12:05','2025-10-31 00:12:05',NULL,NULL,NULL),(11,'Datos del sistema de urgencias corruptos ','Los datos ingresedos recientemente estan corruptos',3,1,2,4,'2025-10-31 09:15:28','2025-10-31 11:15:28','2025-10-31 17:15:28',NULL,NULL,NULL),(22,'Prueba desde Frontend','Probando ticket imagenes',1,6,4,3,'2025-11-25 10:29:27','2025-11-25 18:14:27','2025-11-25 20:29:27',NULL,NULL,'2025-11-25 14:09:09'),(23,'Sin conexion a internet en la recepcion','La conexion se fue desde hace 20 minutos',1,8,2,3,'2025-11-25 14:53:41','2025-11-25 22:53:41','2025-11-26 01:53:41',NULL,NULL,'2025-11-25 15:12:52'),(24,'Sistema de inventario no responde ','El sistema no responde en ninguno de los modulos',2,1,1,4,'2025-11-25 19:04:10','2025-11-26 04:04:10','2025-11-26 10:04:10',NULL,NULL,NULL),(25,'Prueba para notis','Prueba para notis',2,8,1,2,'2025-11-25 21:23:14','2025-11-26 05:23:14','2025-11-26 08:23:14',NULL,NULL,NULL),(26,'Gotera en el techo del lab','Gotera sin reparacion',1,6,2,3,'2025-11-25 21:34:30','2025-11-26 05:19:30','2025-11-26 07:34:30',NULL,NULL,'2025-11-25 21:41:01'),(27,'prueba para la asignacion','probando para la asignacion',1,7,3,1,'2025-11-26 14:13:26','2025-11-26 21:58:26','2025-11-26 23:18:26',NULL,NULL,NULL);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_notificacion`
--

DROP TABLE IF EXISTS `tipos_notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_notificacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_notificacion`
--

LOCK TABLES `tipos_notificacion` WRITE;
/*!40000 ALTER TABLE `tipos_notificacion` DISABLE KEYS */;
INSERT INTO `tipos_notificacion` VALUES (2,'Cambio de Estado'),(4,'Inicio de sesion'),(1,'Nuevo Ticket'),(3,'Ticket Asignado');
/*!40000 ALTER TABLE `tipos_notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `id_rol` int(10) unsigned NOT NULL,
  `ultimo_ingreso` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `disponibilidad` enum('disponible','ocupado','desconectado','vacaciones') DEFAULT NULL,
  `carga_actual` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'carlos@correo.com','$2y$10$reh7qnm400VCYxQHTWfsJev2c9jEzlBXqdgkPk.8uQGxJ74v0hpA.','Carlos Gómez',1,'2025-10-14 12:08:42',1,NULL,NULL),(2,'ana@correo.com','$2y$10$W81.MJVWqgAEjFoQFMlHjeSPSnpgLwTctGtF/qu1XZPEQUphs89Gy','Ana Pérez',1,'2025-10-14 12:08:42',1,NULL,NULL),(3,'luis@correo.com','$2y$10$ZjCqGUjCn3LYQJMKTDAIWuWhyzFOlj7x1NpJsXxXTRhADQCjHiepq','Luis Torres',2,'2025-10-14 12:08:42',1,'disponible',2),(4,'sofia@correo.com','$2y$10$.9k.XAc5J90TnHi1IgxxoeRZnc0Hx7u590C9dXRLTT.akscfC8AtK','Sofía Ramírez',2,'2025-10-14 12:08:42',1,'ocupado',5),(5,'admin@correo.com','$2y$10$pzhE1vVPb8wxZuo09HbCDejJfXCq32T.RVMq3ZGn/rRj6UBZppSN.','Administrador',3,'2025-10-14 12:08:42',1,NULL,NULL),(6,'Mlopez242@correo.com','$2y$10$J7m2jrwQU9i3o1iE9AGsNOZC396Y2De3qJibZKlSQGG4XqMEWOEv.','María López',1,'2025-10-30 12:13:59',1,NULL,NULL),(8,'carlos.fernandez@pulseit.com','$2y$10$iZspdvhsYR.8KGmaf5Y/GuYRnaOqe4OKipCW.hGHotOm6cYMUCH4W','Carlos Fernández',2,'2025-11-04 12:00:06',1,'disponible',0),(9,'angeliqueseguraaa@icloud.com','$2y$10$YbfXS.2R1o4oagk3vGrt7eWhmO4v.Sor/07HW0vzZLdGUHwFa62Xy','Angelique Segura',2,'2025-11-04 15:38:07',1,'disponible',0),(10,'andreyperez109@gmail.com','$2y$10$aNAWGbQh9ckBpdVTM7H4S.ZidChhuWxbbql7x3Zy3kuC19C3oMyGm','Andrey Perez',2,'2025-11-04 15:53:34',1,'vacaciones',0),(11,'admin2@gmail.com','$2y$10$Ja3dPm1U7R3vGlj2SrQTf.1eRJxPmlErMDeUmdxv7KRzr3iMCnzPa','administrador 2.0',3,'2025-11-04 16:18:25',1,NULL,NULL),(12,'alecod31@pulseit.com','$2y$10$N3N.cJiXsVSIg8jkYi/Z..QCav6JwEnjhj5D8Y4HL056PbEjbOYse','Alejandro Serrano',2,'2025-11-04 16:20:15',1,'disponible',0),(15,'gael@421example.com','$2y$10$sNhClglsFsK7g7di17K72O2U6lJRQ7JUprUgFRbRjKfaZA400uG2a','Gael Osorio',2,'2025-11-10 14:55:15',1,'disponible',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoracion`
--

DROP TABLE IF EXISTS `valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoracion` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_ticket` bigint(20) unsigned NOT NULL,
  `id_usuario` int(10) unsigned NOT NULL,
  `puntuacion` tinyint(4) NOT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_ticket` (`id_ticket`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `valoracion_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`),
  CONSTRAINT `valoracion_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoracion`
--

LOCK TABLES `valoracion` WRITE;
/*!40000 ALTER TABLE `valoracion` DISABLE KEYS */;
INSERT INTO `valoracion` VALUES (1,1,1,5,'Excelente atención, se resolvió rápidamente.','2025-10-15 10:48:26'),(2,2,2,4,'El técnico fue atento, aunque tomó varias horas.','2025-10-15 10:48:26'),(3,3,1,3,'El problema se solucionó, pero volvió a ocurrir después.','2025-10-15 10:48:26'),(4,4,2,5,'Muy buen soporte para recuperar el acceso.','2025-10-15 10:48:26'),(5,7,6,5,'Excelente atención, muy rápido.','2025-10-30 13:57:43');
/*!40000 ALTER TABLE `valoracion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-27 15:50:31
