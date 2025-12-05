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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacion`
--

LOCK TABLES `asignacion` WRITE;
/*!40000 ALTER TABLE `asignacion` DISABLE KEYS */;
INSERT INTO `asignacion` VALUES (1,1,3,5,1,'2025-10-15 10:48:26','automatico',NULL,'Asignado automáticamente por prioridad alta (software clínico).',1),(2,2,4,5,1,'2025-10-15 10:48:26','automatico',NULL,'Asignado automáticamente por regla de equipos tecnológicos.',1),(3,3,3,5,2,'2025-10-15 10:48:26','automatico',NULL,'Asignado por carga y especialidad de redes.',1),(4,4,4,5,NULL,'2025-10-15 10:48:26','manual',NULL,'Asignado manualmente por administrador.',1),(5,5,3,5,NULL,'2025-10-16 11:09:49','manual',NULL,'Ejemplo de ticket resuelto para la vista semanal.',1),(6,7,4,5,NULL,'2025-10-30 12:46:21','manual',NULL,'Asignado manualmente por el administrador.',1),(7,8,4,5,NULL,'2025-10-30 14:35:36','manual',NULL,'Asignado manualmente por el administrador.',1),(8,9,4,5,NULL,'2025-10-30 14:46:03','manual',NULL,'Asignado manualmente a técnico.',1),(9,23,12,5,NULL,'2025-11-25 14:57:47','manual',NULL,'Asignado manualmente por el administrador.',1),(10,25,4,5,NULL,'2025-11-25 21:26:19','manual',NULL,'Asignado manualmente por el administrador.',1),(11,26,15,5,NULL,'2025-11-25 21:36:31','manual',NULL,'Asignado manualmente por el administrador.',1),(12,27,3,5,NULL,'2025-11-26 14:18:31','manual',NULL,'Se asigna manualmente desde postman para prueba',1),(13,10,12,5,NULL,'2025-11-27 15:47:30','manual',NULL,'Es el tecnico mas adecuado para el proceso',1),(14,33,10,5,3,'2025-12-02 11:34:34','automatico',-400,'{\"regla_id\":3,\"prioridad\":2,\"tiempo_restante_min\":19,\"componentPrioridad\":1500,\"componentTiempo\":1900,\"componentCarga\":0,\"puntaje_final\":-400}',1),(15,32,10,5,3,'2025-12-02 11:34:34','automatico',-13900,'{\"regla_id\":3,\"prioridad\":3,\"tiempo_restante_min\":169,\"componentPrioridad\":3000,\"componentTiempo\":16900,\"componentCarga\":0,\"puntaje_final\":-13900}',1),(16,31,10,5,3,'2025-12-02 11:34:34','automatico',500,'{\"regla_id\":3,\"prioridad\":1,\"tiempo_restante_min\":0,\"componentPrioridad\":500,\"componentTiempo\":0,\"componentCarga\":0,\"puntaje_final\":500}',1),(17,24,10,5,3,'2025-12-02 11:34:34','automatico',874500,'{\"regla_id\":3,\"prioridad\":2,\"tiempo_restante_min\":-8730,\"componentPrioridad\":1500,\"componentTiempo\":-873000,\"componentCarga\":0,\"puntaje_final\":874500}',1),(18,11,10,5,3,'2025-12-02 11:34:34','automatico',4576900,'{\"regla_id\":3,\"prioridad\":3,\"tiempo_restante_min\":-45739,\"componentPrioridad\":3000,\"componentTiempo\":-4573900,\"componentCarga\":0,\"puntaje_final\":4576900}',1),(19,34,12,5,1,'2025-12-02 11:54:15','automatico',8209.2,'{\"regla_id\":1,\"prioridad\":3,\"tiempo_restante_min\":659,\"componentPrioridad\":9000,\"componentTiempo\":790.8,\"componentCarga\":0,\"puntaje_final\":8209.2}',1),(20,37,9,5,2,'2025-12-02 12:33:41','automatico',412,'{\"regla_id\":2,\"prioridad\":1,\"tiempo_restante_min\":588,\"componentPrioridad\":1000,\"componentTiempo\":588,\"componentCarga\":0,\"puntaje_final\":412}',1),(21,36,9,5,2,'2025-12-02 12:33:41','automatico',5413,'{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":587,\"componentPrioridad\":6000,\"componentTiempo\":587,\"componentCarga\":0,\"puntaje_final\":5413}',1),(22,35,9,5,2,'2025-12-02 12:33:41','automatico',5414,'{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":586,\"componentPrioridad\":6000,\"componentTiempo\":586,\"componentCarga\":0,\"puntaje_final\":5414}',1),(23,38,8,5,2,'2025-12-03 11:51:58','automatico',1142,'{\"regla_id\":2,\"prioridad\":2,\"tiempo_restante_min\":1858,\"componentPrioridad\":3000,\"componentTiempo\":1858,\"componentCarga\":0,\"puntaje_final\":1142}',1),(24,39,10,5,2,'2025-12-03 12:47:28','automatico',1604,'{\"regla_id\":2,\"prioridad\":2,\"tiempo_restante_min\":896,\"componentPrioridad\":3000,\"componentTiempo\":896,\"componentCarga\":500,\"puntaje_final\":1604}',1),(25,42,15,5,2,'2025-12-03 13:03:45','automatico',-959,'{\"regla_id\":2,\"prioridad\":1,\"tiempo_restante_min\":1859,\"componentPrioridad\":1000,\"componentTiempo\":1859,\"componentCarga\":100,\"puntaje_final\":-959}',1),(26,41,12,5,2,'2025-12-03 13:03:45','automatico',5245,'{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":655,\"componentPrioridad\":6000,\"componentTiempo\":655,\"componentCarga\":100,\"puntaje_final\":5245}',1),(27,40,10,5,2,'2025-12-03 13:03:45','automatico',4507,'{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":893,\"componentPrioridad\":6000,\"componentTiempo\":893,\"componentCarga\":600,\"puntaje_final\":4507}',1),(28,43,12,5,2,'2025-12-04 18:46:28','automatico',61,'{\"regla_id\":2,\"prioridad\":1,\"tiempo_restante_min\":739,\"componentPrioridad\":1000,\"componentTiempo\":739,\"componentCarga\":200,\"puntaje_final\":61}',1),(29,44,8,5,1,'2025-12-04 19:02:28','automatico',7821.2,'Se asigna automaticamente el ticket al técnicoCarlos Fernándezya que obtuvo el mejor puntaje',1),(30,45,8,5,1,'2025-12-04 21:36:28','automatico',7722.4,'Se asigna automaticamente el ticket al técnico Carlos Fernández ya que obtuvo el mejor puntaje',1),(31,46,15,5,NULL,'2025-12-04 22:16:50','manual',NULL,'El tecnico cumple con los requisitos',1),(32,48,15,5,1,'2025-12-04 23:09:54','automatico',648.4,'Se asigna automaticamente el ticket al técnico Gael Osorio ya que obtuvo el mejor puntaje',1),(33,47,8,5,1,'2025-12-04 23:09:54','automatico',7628.4,'Se asigna automaticamente el ticket al técnico Carlos Fernández ya que obtuvo el mejor puntaje',1);
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
INSERT INTO `categoria_etiqueta` VALUES (1,1),(1,2),(1,3),(1,4),(2,5),(2,6),(2,7),(2,8),(3,9),(3,10),(3,11),(3,12),(4,13),(4,14),(4,15),(4,16),(6,6),(6,8),(7,13),(7,14),(7,16),(8,5),(8,9),(8,10),(8,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_tickets`
--

LOCK TABLES `historial_tickets` WRITE;
/*!40000 ALTER TABLE `historial_tickets` DISABLE KEYS */;
INSERT INTO `historial_tickets` VALUES (1,1,NULL,1,1,'2025-10-15 10:48:26','Ticket creado por el cliente.',NULL,0),(2,1,1,2,5,'2025-10-15 10:48:26','Administrador asignó al técnico Luis.',NULL,1),(3,2,NULL,1,2,'2025-10-15 10:48:26','Cliente abrió un nuevo ticket.',NULL,0),(4,2,1,2,5,'2025-10-15 10:48:26','Administrador asignó a Sofía.',NULL,1),(5,3,NULL,1,1,'2025-10-15 10:48:26','Ticket de conectividad abierto.',NULL,0),(6,3,1,2,5,'2025-10-15 10:48:26','Técnico asignado automáticamente.',NULL,1),(7,4,NULL,1,2,'2025-10-15 10:48:26','Ticket de soporte interno abierto.',NULL,0),(8,7,NULL,4,6,'2025-10-30 12:37:57','Cliente creó el ticket en estado Pendiente.',NULL,0),(9,7,4,1,5,'2025-10-30 12:41:19','Administrador abrió el ticket.',NULL,0),(10,7,1,2,3,'2025-10-30 12:48:45','Técnico inicia trabajo.',NULL,0),(11,7,2,5,3,'2025-10-30 13:54:13','Técnico resolvió el ticket.',NULL,0),(12,7,5,3,6,'2025-10-30 13:56:42','Cliente revisó la solución y cerró el ticket.',NULL,0),(13,8,NULL,4,6,'2025-10-30 14:14:08','Cliente creó el ticket en estado Pendiente.',NULL,0),(14,8,4,1,5,'2025-10-30 14:34:39','Administrador abrió el ticket.',NULL,0),(15,8,1,2,3,'2025-10-30 14:38:07','Técnico inicia trabajo.',NULL,0),(16,8,2,5,4,'2025-10-30 14:39:39','Técnico resolvió el ticket.',NULL,0),(17,9,NULL,4,6,'2025-10-30 14:44:52','Cliente creó el ticket con estado Pendiente.',NULL,0),(18,9,4,1,5,'2025-10-30 14:45:35','Administrador abrió el ticket.',NULL,0),(19,9,1,2,4,'2025-10-30 14:49:41','Técnico inicia el diagnóstico.',NULL,0),(20,10,NULL,4,2,'2025-10-30 16:14:35','Cliente creó el ticket con estado Pendiente.',NULL,0),(21,11,NULL,4,2,'2025-10-31 09:16:14','Cliente creó el ticket con estado Pendiente.',NULL,0),(30,22,NULL,4,4,'2025-11-25 10:29:27','Cliente creó el ticket con estado Pendiente.',NULL,0),(31,22,1,2,3,'2025-11-25 13:23:41','Se cambia el estado del ticket Prueba BACKEND',NULL,0),(32,22,2,5,3,'2025-11-25 14:07:05','Se cambia el estado del ticket a resuelto Prueba BACKEND',NULL,0),(33,22,5,3,5,'2025-11-25 14:09:09','Se cambia el estado del ticket a CERRADO Prueba BACKEND',NULL,0),(34,23,NULL,4,2,'2025-11-25 14:53:41','Cliente creó el ticket con estado Pendiente.',NULL,0),(35,23,4,1,5,'2025-11-25 14:56:37','Administrador asigno el ticket.',NULL,0),(36,23,1,2,12,'2025-11-25 15:04:34','Empece con la revision de las conexiones. En proceso',NULL,0),(37,23,2,5,12,'2025-11-25 15:09:57','Ticket resuelto. Problema con las conexiones internas solucionado',NULL,0),(38,23,5,3,2,'2025-11-25 15:12:52','El ticket esta resuelto a tiempo',NULL,0),(39,24,NULL,4,1,'2025-11-25 19:04:10','Cliente creó el ticket con estado Pendiente.',NULL,0),(40,5,5,3,5,'2025-11-25 21:14:32','El tecnico ha finalizado con el ticket ',NULL,0),(41,8,5,3,5,'2025-11-25 21:15:13','El tecnico ha resuelto el ticket ',NULL,0),(42,25,NULL,4,1,'2025-11-25 21:23:14','Cliente creó el ticket con estado Pendiente.',NULL,0),(43,25,4,1,5,'2025-11-25 21:25:40','Administrador abrió el ticket.',NULL,0),(44,25,1,2,4,'2025-11-25 21:28:47','Empece con el trabajo. en proceso',NULL,0),(45,26,NULL,4,2,'2025-11-25 21:34:30','Cliente creó el ticket con estado Pendiente.',NULL,0),(46,26,4,1,5,'2025-11-25 21:35:29','Administrador abrió el ticket.',NULL,0),(47,26,1,2,15,'2025-11-25 21:39:01','En proceso de resolucion',NULL,0),(48,26,2,5,15,'2025-11-25 21:39:40','Ticket resuelto',NULL,0),(49,26,5,3,2,'2025-11-25 21:41:01','Cerrado',NULL,0),(50,27,NULL,4,3,'2025-11-26 14:13:26','Cliente creó el ticket con estado Pendiente.',NULL,0),(51,27,4,1,5,'2025-11-26 14:18:31','Pasa a ser asignado',NULL,0),(52,10,4,1,5,'2025-11-27 15:47:30','Asignar para prueba',NULL,0),(53,33,4,1,5,'2025-12-02 11:34:34','{\"regla_id\":3,\"prioridad\":2,\"tiempo_restante_min\":19,\"componentPrioridad\":1500,\"componentTiempo\":1900,\"componentCarga\":0,\"puntaje_final\":-400}',14,1),(54,32,4,1,5,'2025-12-02 11:34:34','{\"regla_id\":3,\"prioridad\":3,\"tiempo_restante_min\":169,\"componentPrioridad\":3000,\"componentTiempo\":16900,\"componentCarga\":0,\"puntaje_final\":-13900}',15,1),(55,31,4,1,5,'2025-12-02 11:34:34','{\"regla_id\":3,\"prioridad\":1,\"tiempo_restante_min\":0,\"componentPrioridad\":500,\"componentTiempo\":0,\"componentCarga\":0,\"puntaje_final\":500}',16,1),(56,24,4,1,5,'2025-12-02 11:34:34','{\"regla_id\":3,\"prioridad\":2,\"tiempo_restante_min\":-8730,\"componentPrioridad\":1500,\"componentTiempo\":-873000,\"componentCarga\":0,\"puntaje_final\":874500}',17,1),(57,11,4,1,5,'2025-12-02 11:34:34','{\"regla_id\":3,\"prioridad\":3,\"tiempo_restante_min\":-45739,\"componentPrioridad\":3000,\"componentTiempo\":-4573900,\"componentCarga\":0,\"puntaje_final\":4576900}',18,1),(58,34,NULL,4,2,'2025-12-02 11:53:42','Cliente creó el ticket con estado Pendiente.',NULL,0),(59,34,4,1,5,'2025-12-02 11:54:15','{\"regla_id\":1,\"prioridad\":3,\"tiempo_restante_min\":659,\"componentPrioridad\":9000,\"componentTiempo\":790.8,\"componentCarga\":0,\"puntaje_final\":8209.2}',19,1),(60,35,NULL,4,6,'2025-12-02 12:20:07','Cliente creó el ticket con estado Pendiente.',NULL,0),(61,36,NULL,4,6,'2025-12-02 12:20:50','Cliente creó el ticket con estado Pendiente.',NULL,0),(62,37,NULL,4,6,'2025-12-02 12:21:46','Cliente creó el ticket con estado Pendiente.',NULL,0),(63,37,4,1,5,'2025-12-02 12:33:41','{\"regla_id\":2,\"prioridad\":1,\"tiempo_restante_min\":588,\"componentPrioridad\":1000,\"componentTiempo\":588,\"componentCarga\":0,\"puntaje_final\":412}',20,1),(64,36,4,1,5,'2025-12-02 12:33:41','{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":587,\"componentPrioridad\":6000,\"componentTiempo\":587,\"componentCarga\":0,\"puntaje_final\":5413}',21,1),(65,35,4,1,5,'2025-12-02 12:33:41','{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":586,\"componentPrioridad\":6000,\"componentTiempo\":586,\"componentCarga\":0,\"puntaje_final\":5414}',22,1),(66,38,NULL,4,2,'2025-12-03 11:50:55','Cliente creó el ticket con estado Pendiente.',NULL,0),(67,38,4,1,5,'2025-12-03 11:51:58','{\"regla_id\":2,\"prioridad\":2,\"tiempo_restante_min\":1858,\"componentPrioridad\":3000,\"componentTiempo\":1858,\"componentCarga\":0,\"puntaje_final\":1142}',23,1),(68,39,NULL,4,2,'2025-12-03 12:43:55','Cliente creó el ticket con estado Pendiente.',NULL,0),(69,39,4,1,5,'2025-12-03 12:47:28','{\"regla_id\":2,\"prioridad\":2,\"tiempo_restante_min\":896,\"componentPrioridad\":3000,\"componentTiempo\":896,\"componentCarga\":500,\"puntaje_final\":1604}',24,1),(70,40,NULL,4,2,'2025-12-03 12:57:12','Cliente creó el ticket con estado Pendiente.',NULL,0),(71,41,NULL,4,1,'2025-12-03 12:59:04','Cliente creó el ticket con estado Pendiente.',NULL,0),(72,42,NULL,4,6,'2025-12-03 13:02:45','Cliente creó el ticket con estado Pendiente.',NULL,0),(73,42,4,1,5,'2025-12-03 13:03:45','{\"regla_id\":2,\"prioridad\":1,\"tiempo_restante_min\":1859,\"componentPrioridad\":1000,\"componentTiempo\":1859,\"componentCarga\":100,\"puntaje_final\":-959}',25,1),(74,41,4,1,5,'2025-12-03 13:03:45','{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":655,\"componentPrioridad\":6000,\"componentTiempo\":655,\"componentCarga\":100,\"puntaje_final\":5245}',26,1),(75,40,4,1,5,'2025-12-03 13:03:45','{\"regla_id\":2,\"prioridad\":3,\"tiempo_restante_min\":893,\"componentPrioridad\":6000,\"componentTiempo\":893,\"componentCarga\":600,\"puntaje_final\":4507}',27,1),(76,43,NULL,4,16,'2025-12-04 18:05:54','Cliente creó el ticket con estado Pendiente.',NULL,0),(77,43,4,1,5,'2025-12-04 18:46:28','{\"regla_id\":2,\"prioridad\":1,\"tiempo_restante_min\":739,\"componentPrioridad\":1000,\"componentTiempo\":739,\"componentCarga\":200,\"puntaje_final\":61}',28,1),(78,44,NULL,4,17,'2025-12-04 19:01:43','Cliente creó el ticket con estado Pendiente.',NULL,0),(79,44,4,1,5,'2025-12-04 19:02:28','Se asigna automaticamente el ticket al técnicoCarlos Fernándezya que obtuvo el mejor puntaje',29,1),(80,44,1,2,8,'2025-12-04 19:19:56','Se empieza a solucionar el problema',NULL,0),(81,44,2,5,8,'2025-12-04 19:25:57','El problema se ha solucionado, impresion funciona ',NULL,0),(82,44,5,3,17,'2025-12-04 19:27:01','El ticket esta listo para cerrar',NULL,0),(83,45,NULL,4,18,'2025-12-04 21:35:06','Cliente creó el ticket con estado Pendiente.',NULL,0),(84,45,4,1,5,'2025-12-04 21:36:28','Se asigna automaticamente el ticket al técnico Carlos Fernández ya que obtuvo el mejor puntaje',30,1),(85,45,1,2,8,'2025-12-04 21:39:34','Ya esta en proceso',NULL,0),(86,45,2,5,8,'2025-12-04 21:39:54','Finalizado',NULL,0),(87,45,5,3,18,'2025-12-04 21:40:44','Cerrado',NULL,0),(88,46,NULL,4,18,'2025-12-04 22:14:39','Cliente creó el ticket con estado Pendiente.',NULL,0),(89,46,4,1,5,'2025-12-04 22:16:50','Se asigna a Gael Osorio',NULL,0),(90,46,1,2,15,'2025-12-04 22:17:53','Ticket en proceso',NULL,0),(91,46,2,5,15,'2025-12-04 22:18:07','Finalizado',NULL,0),(92,46,5,3,5,'2025-12-04 22:18:50','Cerrado',NULL,0),(93,47,NULL,4,18,'2025-12-04 23:03:31','Cliente creó el ticket con estado Pendiente.',NULL,0),(94,48,NULL,4,18,'2025-12-04 23:08:17','Cliente creó el ticket con estado Pendiente.',NULL,0),(95,48,4,1,5,'2025-12-04 23:09:54','Se asigna automaticamente el ticket al técnico Gael Osorio ya que obtuvo el mejor puntaje',32,1),(96,47,4,1,5,'2025-12-04 23:09:54','Se asigna automaticamente el ticket al técnico Carlos Fernández ya que obtuvo el mejor puntaje',33,1),(97,48,1,2,15,'2025-12-04 23:11:54','En proceso',NULL,0),(98,48,2,5,15,'2025-12-04 23:12:14','Resuelto',NULL,0),(99,48,5,3,18,'2025-12-04 23:13:12','Cerrado',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_historial_tickets`
--

LOCK TABLES `imagenes_historial_tickets` WRITE;
/*!40000 ALTER TABLE `imagenes_historial_tickets` DISABLE KEYS */;
INSERT INTO `imagenes_historial_tickets` VALUES (1,1,'error_historia.png','/uploads/1/error_historia.png','image/png',250000,1,'2025-10-15 10:48:26'),(2,3,'equipo_medico.png','/uploads/2/equipo_medico.png','image/png',180000,2,'2025-10-15 10:48:26'),(3,5,'wifi_down.png','/uploads/3/wifi_down.png','image/png',200000,1,'2025-10-15 10:48:26'),(4,17,'falloImpresora.png','http://localhost:81/PulseIT/api/uploads/falloImpresora.png','png',276783,6,'2025-10-30 15:46:33'),(5,19,'procesoImpresora.png','http://localhost:81/PulseIT/api/uploads/procesoImpresora.png','png',276783,4,'2025-10-30 15:50:52'),(14,30,'evidencia_6925d967ad3ec.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6925d967ad3ec.png','',573932,4,'2025-11-25 10:29:27'),(15,30,'evidencia_6925d967ae000.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6925d967ae000.png','',836783,4,'2025-11-25 10:29:27'),(16,34,'evidencia_6926175614a28.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6926175614a28.png','',175531,2,'2025-11-25 14:53:42'),(17,36,'evidencia_692619e2df147.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692619e2df147.png','',343364,12,'2025-11-25 15:04:34'),(18,37,'evidencia_69261b264ba4b.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69261b264ba4b.png','',103402,12,'2025-11-25 15:09:58'),(19,37,'evidencia_69261b26504a0.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69261b26504a0.png','',46003,12,'2025-11-25 15:09:58'),(20,38,'evidencia_69261bd475f56.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69261bd475f56.png','',15047,2,'2025-11-25 15:12:52'),(21,39,'evidencia_6926520ad526e.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6926520ad526e.png','',83133,1,'2025-11-25 19:04:10'),(22,41,'evidencia_692670c2117eb.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692670c2117eb.png','',3585,5,'2025-11-25 21:15:14'),(23,42,'evidencia_692672a366d6c.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692672a366d6c.png','',2050175,1,'2025-11-25 21:23:15'),(24,44,'evidencia_692673ef9dfb3.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692673ef9dfb3.png','',178331,4,'2025-11-25 21:28:47'),(25,45,'evidencia_6926754726278.jpg',' http://localhost:81/PulseIT/api/uploads/evidencia_6926754726278.jpg','',18220,2,'2025-11-25 21:34:31'),(26,47,'evidencia_69267655d7598.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69267655d7598.png','',573932,15,'2025-11-25 21:39:01'),(27,48,'evidencia_6926767d2a3ba.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6926767d2a3ba.png','',836783,15,'2025-11-25 21:39:41'),(28,50,'evidencia_69275f6737e3d.jpeg',' http://localhost:81/PulseIT/api/uploads/evidencia_69275f6737e3d.jpeg','',188977,3,'2025-11-26 14:13:27'),(29,52,'evidencia_6928c6f339e22.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6928c6f339e22.png','',1492,5,'2025-11-27 15:47:31'),(30,58,'evidencia_692f27a6a034f.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692f27a6a034f.png','',376114,2,'2025-12-02 11:53:42'),(31,60,'evidencia_692f2dd79a750.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692f2dd79a750.png','',2050175,6,'2025-12-02 12:20:07'),(32,61,'evidencia_692f2e0297573.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692f2e0297573.png','',104837,6,'2025-12-02 12:20:50'),(33,62,'evidencia_692f2e3a6aef0.png',' http://localhost:81/PulseIT/api/uploads/evidencia_692f2e3a6aef0.png','',38551,6,'2025-12-02 12:21:46'),(34,66,'evidencia_6930788002d68.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6930788002d68.png','',26763,2,'2025-12-03 11:50:56'),(35,68,'evidencia_693084ebc5c97.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693084ebc5c97.png','',31633,2,'2025-12-03 12:43:55'),(36,70,'evidencia_6930880904910.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6930880904910.png','',297599,2,'2025-12-03 12:57:13'),(37,71,'evidencia_69308878d0b94.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69308878d0b94.png','',32342,1,'2025-12-03 12:59:04'),(38,72,'evidencia_6930895595605.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6930895595605.png','',181322,6,'2025-12-03 13:02:45'),(40,78,'evidencia_69322ef7a9563.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69322ef7a9563.png','',121819,17,'2025-12-04 19:01:43'),(41,80,'evidencia_6932333cf1442.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6932333cf1442.png','',340248,8,'2025-12-04 19:19:56'),(42,81,'evidencia_693234a5efce7.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693234a5efce7.png','',171314,8,'2025-12-04 19:25:57'),(43,82,'evidencia_693234e630fe7.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693234e630fe7.png','',26835,17,'2025-12-04 19:27:02'),(44,83,'evidencia_693252eabf774.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693252eabf774.png','',340248,18,'2025-12-04 21:35:06'),(45,85,'evidencia_693253f73c13d.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693253f73c13d.png','',140347,8,'2025-12-04 21:39:35'),(46,86,'evidencia_6932540ace351.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6932540ace351.png','',231432,8,'2025-12-04 21:39:54'),(47,87,'evidencia_6932543c6c6cf.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6932543c6c6cf.png','',231432,18,'2025-12-04 21:40:44'),(48,88,'evidencia_69325c303182f.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69325c303182f.png','',22560,18,'2025-12-04 22:14:40'),(49,89,'evidencia_69325cb36326f.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69325cb36326f.png','',12349,5,'2025-12-04 22:16:51'),(50,90,'evidencia_69325cf25b893.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69325cf25b893.png','',8003,15,'2025-12-04 22:17:54'),(51,91,'evidencia_69325d004b967.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69325d004b967.png','',27077,15,'2025-12-04 22:18:08'),(52,92,'evidencia_69325d2b16f76.png',' http://localhost:81/PulseIT/api/uploads/evidencia_69325d2b16f76.png','',35490,5,'2025-12-04 22:18:51'),(53,93,'evidencia_693267a40515f.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693267a40515f.png','',121819,18,'2025-12-04 23:03:32'),(54,93,'evidencia_693267a405dc9.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693267a405dc9.png','',171314,18,'2025-12-04 23:03:32'),(55,94,'evidencia_693268c1b5c0c.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693268c1b5c0c.png','',32342,18,'2025-12-04 23:08:17'),(56,97,'evidencia_6932699b59d2a.png',' http://localhost:81/PulseIT/api/uploads/evidencia_6932699b59d2a.png','',32342,15,'2025-12-04 23:11:55'),(57,98,'evidencia_693269aeec9c2.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693269aeec9c2.png','',32342,15,'2025-12-04 23:12:14'),(58,99,'evidencia_693269e92dcbc.png',' http://localhost:81/PulseIT/api/uploads/evidencia_693269e92dcbc.png','',32342,18,'2025-12-04 23:13:13');
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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
INSERT INTO `notificacion` VALUES (1,3,3,5,'{\"mensaje\": \"Se te asignó el ticket 1\"}',1,'2025-10-14 12:08:42'),(2,1,2,5,'{\"mensaje\": \"Tu ticket cambió a En Proceso\"}',1,'2025-10-14 12:08:42'),(3,2,1,5,'{\"mensaje\": \"Se creó tu ticket exitosamente\"}',1,'2025-10-14 12:08:42'),(5,1,4,5,'Esta notificacion es de prueba',0,'2025-11-25 18:50:59'),(6,1,1,5,'Ticket creado #24 - Sistema de inventario no responde ',0,'2025-11-25 19:04:11'),(7,1,1,5,'Ticket creado #25 - Prueba para notis',0,'2025-11-25 21:23:16'),(8,1,2,4,'',0,'2025-11-25 21:28:48'),(9,2,1,5,'Ticket creado #26 - Gotera en el techo del lab',0,'2025-11-25 21:34:32'),(10,2,2,15,'Ticket puesto en proceso',1,'2025-11-25 21:39:02'),(11,2,2,15,'El Ticket se ha resuelto',1,'2025-11-25 21:39:42'),(12,3,1,5,'Ticket creado #27 - prueba para la asignacion',0,'2025-11-26 14:13:28'),(13,12,3,5,'Se te ha asignado un nuevo ticket:Cables de conexion no responden',0,'2025-11-27 15:47:32'),(14,10,3,5,'{\"mensaje\":\"Se te ha asignado el ticket #33\",\"puntaje\":-400}',0,'2025-12-02 11:34:34'),(15,1,2,5,'{\"mensaje\":\"Tu ticket #33 ha sido asignado al t\\u00e9cnico Andrey Perez\"}',0,'2025-12-02 11:34:34'),(16,10,3,5,'{\"mensaje\":\"Se te ha asignado el ticket #32\",\"puntaje\":-13900}',0,'2025-12-02 11:34:34'),(17,1,2,5,'{\"mensaje\":\"Tu ticket #32 ha sido asignado al t\\u00e9cnico Andrey Perez\"}',0,'2025-12-02 11:34:34'),(18,10,3,5,'{\"mensaje\":\"Se te ha asignado el ticket #31\",\"puntaje\":500}',0,'2025-12-02 11:34:34'),(19,1,2,5,'{\"mensaje\":\"Tu ticket #31 ha sido asignado al t\\u00e9cnico Andrey Perez\"}',0,'2025-12-02 11:34:34'),(20,10,3,5,'{\"mensaje\":\"Se te ha asignado el ticket #24\",\"puntaje\":874500}',0,'2025-12-02 11:34:34'),(21,1,2,5,'{\"mensaje\":\"Tu ticket #24 ha sido asignado al t\\u00e9cnico Andrey Perez\"}',0,'2025-12-02 11:34:34'),(22,10,3,5,'{\"mensaje\":\"Se te ha asignado el ticket #11\",\"puntaje\":4576900}',0,'2025-12-02 11:34:34'),(23,2,2,5,'{\"mensaje\":\"Tu ticket #11 ha sido asignado al t\\u00e9cnico Andrey Perez\"}',1,'2025-12-02 11:34:34'),(24,2,1,5,'notifications.ticketCreated',1,'2025-12-02 11:53:43'),(25,6,1,5,'notifications.ticketCreated',1,'2025-12-02 12:20:08'),(26,6,1,5,'notifications.ticketCreated',1,'2025-12-02 12:20:51'),(27,6,1,5,'notifications.ticketCreated',1,'2025-12-02 12:21:47'),(28,9,3,5,'Se te ha asignado el ticket #37puntaje412',0,'2025-12-02 12:33:41'),(29,6,2,5,'{\"mensaje\":\"Tu ticket #37 ha sido asignado al t\\u00e9cnico Angelique Segura\"}',1,'2025-12-02 12:33:41'),(30,9,3,5,'Se te ha asignado el ticket #36puntaje5413',0,'2025-12-02 12:33:41'),(31,6,2,5,'{\"mensaje\":\"Tu ticket #36 ha sido asignado al t\\u00e9cnico Angelique Segura\"}',1,'2025-12-02 12:33:41'),(32,9,3,5,'Se te ha asignado el ticket #35puntaje5414',0,'2025-12-02 12:33:41'),(33,6,2,5,'{\"mensaje\":\"Tu ticket #35 ha sido asignado al t\\u00e9cnico Angelique Segura\"}',0,'2025-12-02 12:33:41'),(34,2,1,5,'Ticket creado #38 - Prueba notis',0,'2025-12-03 11:50:56'),(35,8,3,5,'Se te ha asignado el ticket #38puntaje1142',0,'2025-12-03 11:51:58'),(36,2,2,5,'{\"mensaje\":\"Tu ticket #38 ha sido asignado al t\\u00e9cnico Carlos Fern\\u00e1ndez\"}',1,'2025-12-03 11:51:58'),(37,2,1,5,'Ticket creado #39 - Prueba Asignar Automatico Frontend',0,'2025-12-03 12:43:56'),(38,10,3,5,'Se te ha asignado el ticket #39puntaje1604',0,'2025-12-03 12:47:29'),(39,2,2,5,'{\"mensaje\":\"Tu ticket #39 ha sido asignado al t\\u00e9cnico Andrey Perez\"}',1,'2025-12-03 12:47:29'),(40,2,1,5,'Ticket creado #40 - Problema con el sistema MedicalTsd',0,'2025-12-03 12:57:13'),(41,1,1,5,'Ticket creado #41 - Error en el modulo de red del sistema',0,'2025-12-03 12:59:05'),(42,6,1,5,'Ticket creado #42 - La impresora de recepcion no responde ',0,'2025-12-03 13:02:46'),(43,15,3,5,'Se te ha asignado el ticket #42puntaje-959',0,'2025-12-03 13:03:45'),(44,6,2,5,'{\"mensaje\":\"Tu ticket #42 ha sido asignado al t\\u00e9cnico Gael Osorio\"}',0,'2025-12-03 13:03:45'),(45,12,3,5,'Se te ha asignado el ticket #41puntaje5245',0,'2025-12-03 13:03:45'),(46,1,2,5,'{\"mensaje\":\"Tu ticket #41 ha sido asignado al t\\u00e9cnico Alejandro Serrano\"}',0,'2025-12-03 13:03:45'),(47,10,3,5,'Se te ha asignado el ticket #40puntaje4507',0,'2025-12-03 13:03:45'),(48,2,2,5,'{\"mensaje\":\"Tu ticket #40 ha sido asignado al t\\u00e9cnico Andrey Perez\"}',1,'2025-12-03 13:03:45'),(49,12,3,5,'Se te ha asignado el ticket #43puntaje61',0,'2025-12-04 18:46:28'),(50,16,2,5,'Tu ticket #43 ha sido asignado al técnicoAlejandro Serrano',0,'2025-12-04 18:46:28'),(51,17,1,5,'Ticket creado #44 - Fallo en sistema de impresion PAC',1,'2025-12-04 19:01:44'),(52,8,3,5,'Se te ha asignado el ticket #44puntaje7821.2',0,'2025-12-04 19:02:28'),(53,17,2,5,'Tu ticket #44 ha sido asignado al técnicoCarlos Fernández',0,'2025-12-04 19:02:28'),(54,2,4,5,'Esta notificacion es de prueba',1,'2025-12-04 19:10:05'),(55,17,2,8,'Ticket #44 puesto en proceso',0,'2025-12-04 19:19:57'),(56,17,2,8,'Ticket #44 se ha resuelto',0,'2025-12-04 19:25:58'),(57,17,2,17,'Ticket #44 ha sido cerrado',0,'2025-12-04 19:27:03'),(58,2,4,5,'Hola,Ana Pérez, PulseIT le informa de un inicio de sesión exitoso el undefined ',1,'2025-12-04 21:27:15'),(59,2,4,5,'Hola,Ana Pérez, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:28:21 ',0,'2025-12-04 21:28:22'),(60,18,4,5,'Hola,Magali Ortega, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:33:32 ',1,'2025-12-04 21:33:33'),(61,18,1,5,'Ticket creado #45 - Error en el sistema de inventario',1,'2025-12-04 21:35:07'),(62,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:35:31 ',1,'2025-12-04 21:35:32'),(63,8,3,5,'Se te ha asignado el ticket #45puntaje7722.4',0,'2025-12-04 21:36:28'),(64,18,2,5,'Tu ticket #45 ha sido asignado al técnicoCarlos Fernández',1,'2025-12-04 21:36:28'),(65,1,4,5,'Hola,Carlos Gómez, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:37:53 ',0,'2025-12-04 21:37:53'),(66,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:38:16 ',1,'2025-12-04 21:38:17'),(67,8,4,5,'Hola,Carlos Fernández, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:39:05 ',0,'2025-12-04 21:39:06'),(68,18,2,8,'Ticket #45 puesto en proceso',1,'2025-12-04 21:39:36'),(69,18,2,8,'Ticket #45 se ha resuelto',1,'2025-12-04 21:39:55'),(70,18,4,5,'Hola,Magali Ortega, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:40:18 ',1,'2025-12-04 21:40:19'),(71,18,2,18,'Ticket #45 ha sido cerrado',1,'2025-12-04 21:40:45'),(72,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 21:46:39 ',1,'2025-12-04 21:46:39'),(73,18,4,5,'Hola,Magali Ortega, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 22:13:58 ',1,'2025-12-04 22:13:59'),(74,18,1,5,'Ticket creado #46 - Prueba para traduccion',1,'2025-12-04 22:14:41'),(75,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 22:14:57 ',1,'2025-12-04 22:14:58'),(76,15,3,5,'Se te ha asignado un nuevo ticket:Prueba para traduccion',0,'2025-12-04 22:16:52'),(77,15,4,5,'Hola,Gael Osorio, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 22:17:15 ',0,'2025-12-04 22:17:16'),(78,18,2,15,'Ticket #46 puesto en proceso',1,'2025-12-04 22:17:55'),(79,18,2,15,'Ticket #46 se ha resuelto',1,'2025-12-04 22:18:09'),(80,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 22:18:26 ',1,'2025-12-04 22:18:27'),(81,18,2,5,'Ticket #46 ha sido cerrado',1,'2025-12-04 22:18:51'),(82,15,4,5,'Hola,Gael Osorio, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 22:19:57 ',0,'2025-12-04 22:19:58'),(83,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 22:39:07 ',0,'2025-12-04 22:39:08'),(84,18,4,5,'Hola,Magali Ortega, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 22:58:28 ',1,'2025-12-04 22:58:29'),(85,18,1,5,'Ticket creado #47 - Error software medico',0,'2025-12-04 23:03:32'),(86,18,4,5,'Hola,Magali Ortega, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 23:04:00 ',0,'2025-12-04 23:04:01'),(87,18,1,5,'Ticket creado #48 - No puedo recuperar mi contraseña',0,'2025-12-04 23:08:18'),(88,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 23:08:39 ',1,'2025-12-04 23:08:39'),(89,15,3,5,'Se te ha asignado el ticket #48puntaje648.4',0,'2025-12-04 23:09:54'),(90,18,2,5,'Tu ticket #48 ha sido asignado al técnicoGael Osorio',0,'2025-12-04 23:09:54'),(91,8,3,5,'Se te ha asignado el ticket #47puntaje7628.4',0,'2025-12-04 23:09:54'),(92,18,2,5,'Tu ticket #47 ha sido asignado al técnicoCarlos Fernández',0,'2025-12-04 23:09:54'),(93,15,4,5,'Hola,Gael Osorio, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 23:11:00 ',1,'2025-12-04 23:11:00'),(94,18,2,15,'Ticket #48 puesto en proceso',1,'2025-12-04 23:11:56'),(95,18,2,15,'Ticket #48 se ha resuelto',1,'2025-12-04 23:12:15'),(96,18,4,5,'Hola,Magali Ortega, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 23:12:44 ',1,'2025-12-04 23:12:45'),(97,18,2,18,'Ticket #48 ha sido cerrado',0,'2025-12-04 23:13:14'),(98,5,4,5,'Hola,Administrador, PulseIT le informa de un inicio de sesión exitoso el 2025-12-04 23:25:15 ',0,'2025-12-04 23:25:15');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reglas_autotriage`
--

LOCK TABLES `reglas_autotriage` WRITE;
/*!40000 ALTER TABLE `reglas_autotriage` DISABLE KEYS */;
INSERT INTO `reglas_autotriage` VALUES (1,'Regla Prioridad Alta','Tickets críticos se asignan primero.',1,1.5,1.2,1,5,'2025-10-14 12:08:42'),(2,'Regla Balanceada','Distribuye según carga y prioridad.',1,1,1,1,5,'2025-10-14 12:08:42'),(3,'Priorizar SLA Crítico','Regla que prioriza fuertemente tickets con tiempo restante pequeño (evitar vencimientos).',1,0.5,100,0.5,1,'2025-12-02 11:22:52');
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
INSERT INTO `tecnico_especialidad` VALUES (3,4),(3,6),(3,12),(4,4),(4,5),(4,6),(4,12),(8,1),(8,2),(8,3),(9,4),(9,5),(9,6),(10,1),(10,2),(12,7),(12,8),(12,9),(15,6),(15,11),(15,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'Error en módulo de historia clínica','El sistema no guarda correctamente los registros médicos.',2,1,1,1,'2025-10-15 10:48:26','2025-10-15 12:48:26','2025-10-15 18:48:26',NULL,NULL,NULL),(2,'Monitor de signos vitales no enciende','El equipo médico no responde al encenderlo.',1,2,2,1,'2025-10-15 10:48:26','2025-10-15 14:48:26','2025-10-16 10:48:26',NULL,NULL,NULL),(3,'Pérdida de conexión Wi-Fi en consultorios','Los consultorios 3 y 4 no tienen acceso a la red Wi-Fi institucional.',3,3,1,1,'2025-10-15 10:48:26','2025-10-15 11:48:26','2025-10-15 16:48:26',NULL,NULL,NULL),(4,'No puedo ingresar al sistema','El usuario no puede acceder al sistema interno del hospital.',2,4,2,1,'2025-10-15 10:48:26','2025-10-15 11:48:26','2025-10-15 14:48:26',NULL,NULL,NULL),(5,'Actualización de software de laboratorio','El sistema de control de muestras requiere una actualización de versión para resolver un bug.',2,1,1,3,'2025-10-16 11:09:40','2025-10-16 13:09:40','2025-10-16 19:09:40',NULL,NULL,'2025-11-25 21:14:32'),(7,'Solicitud de instalación de software','Se requiere instalar software en nuevo equipo',2,1,6,3,'2025-10-30 12:23:16','2025-10-30 14:23:16','2025-10-30 20:23:16',1,1,'2025-10-30 13:56:42'),(8,'Error en acceso remoto','No se puede acceder al sistema desde casa.',2,4,6,3,'2025-10-30 14:13:32','2025-10-30 16:13:32','2025-10-30 22:13:32',NULL,NULL,'2025-11-25 21:15:13'),(9,'Revision de impresora sala 2B','Impresora no esta funcionando',1,2,6,2,'2025-10-30 14:44:16','2025-10-30 16:44:16','2025-10-30 22:44:16',NULL,NULL,NULL),(10,'Cables de conexion no responden','Los cables UTP del laboratorio 9-1 no funcionan',3,3,2,1,'2025-10-30 16:12:05','2025-10-30 18:12:05','2025-10-31 00:12:05',NULL,NULL,NULL),(11,'Datos del sistema de urgencias corruptos ','Los datos ingresedos recientemente estan corruptos',3,1,2,1,'2025-10-31 09:15:28','2025-10-31 11:15:28','2025-10-31 17:15:28',NULL,NULL,NULL),(22,'Prueba desde Frontend','Probando ticket imagenes',1,6,4,3,'2025-11-25 10:29:27','2025-11-25 18:14:27','2025-11-25 20:29:27',NULL,NULL,'2025-11-25 14:09:09'),(23,'Sin conexion a internet en la recepcion','La conexion se fue desde hace 20 minutos',1,8,2,3,'2025-11-25 14:53:41','2025-11-25 22:53:41','2025-11-26 01:53:41',NULL,NULL,'2025-11-25 15:12:52'),(24,'Sistema de inventario no responde ','El sistema no responde en ninguno de los modulos',2,1,1,1,'2025-11-25 19:04:10','2025-11-26 04:04:10','2025-11-26 10:04:10',NULL,NULL,NULL),(25,'Prueba para notis','Prueba para notis',2,8,1,2,'2025-11-25 21:23:14','2025-11-26 05:23:14','2025-11-26 08:23:14',NULL,NULL,NULL),(26,'Gotera en el techo del lab','Gotera sin reparacion',1,6,2,3,'2025-11-25 21:34:30','2025-11-26 05:19:30','2025-11-26 07:34:30',NULL,NULL,'2025-11-25 21:41:01'),(27,'prueba para la asignacion','probando para la asignacion',1,7,3,1,'2025-11-26 14:13:26','2025-11-26 21:58:26','2025-11-26 23:18:26',NULL,NULL,NULL),(31,'Prueba SLA A','Prioridad 1, SLA muy cercano (10 min)',1,1,1,1,'2025-12-02 11:24:20','2025-12-02 11:29:20','2025-12-02 11:34:20',NULL,NULL,NULL),(32,'Prueba SLA B','Prioridad 3, SLA lejano (180 min)',3,1,1,1,'2025-12-02 11:24:20','2025-12-02 12:24:20','2025-12-02 14:24:20',NULL,NULL,NULL),(33,'Prueba SLA C','Prioridad 2, SLA cercano (30 min)',2,1,1,1,'2025-12-02 11:24:20','2025-12-02 11:39:20','2025-12-02 11:54:20',NULL,NULL,NULL),(34,'Prueba automatica para red','probando automatica para red',3,8,2,1,'2025-12-02 11:53:42','2025-12-02 19:53:42','2025-12-02 22:53:42',NULL,NULL,NULL),(35,'Prueba de asignacion automatica Estacion de trabajo Urgente ','Probando asignacion automatica Estacion de trabajo ',3,6,6,1,'2025-12-02 12:20:07','2025-12-02 20:05:07','2025-12-02 22:20:07',NULL,NULL,NULL),(36,'Prueba de asignacion automatica Estacion de trabajo Urgente 2','probando asignacion automatica Estacion de trabajo Urgente 2',3,6,6,1,'2025-12-02 12:20:50','2025-12-02 20:05:50','2025-12-02 22:20:50',NULL,NULL,NULL),(37,'Prueba de asignacion automatica Estacion de trabajo Normal','Probando asignacion automatica Estacion de trabajo Normal',1,6,6,1,'2025-12-02 12:21:46','2025-12-02 20:06:46','2025-12-02 22:21:46',NULL,NULL,NULL),(38,'Prueba notis','Probando notificacion trad',2,2,2,1,'2025-12-03 11:50:55','2025-12-03 22:50:55','2025-12-04 18:50:55',NULL,NULL,NULL),(39,'Prueba Asignar Automatico Frontend','Probando Asignar Automatico Frontend',2,1,2,1,'2025-12-03 12:43:55','2025-12-03 21:43:55','2025-12-04 03:43:55',NULL,NULL,NULL),(40,'Problema con el sistema MedicalTsd','El sistema no calcula bien los datos del historial',3,1,2,1,'2025-12-03 12:57:12','2025-12-03 21:57:12','2025-12-04 03:57:12',NULL,NULL,NULL),(41,'Error en el modulo de red del sistema','La red no se establece en el sistema',3,8,1,1,'2025-12-03 12:59:04','2025-12-03 20:59:04','2025-12-03 23:59:04',NULL,NULL,NULL),(42,'La impresora de recepcion no responde ','No enciende incluso despues de varios reinicios',1,2,6,1,'2025-12-03 13:02:45','2025-12-04 00:02:45','2025-12-04 20:02:45',NULL,NULL,NULL),(43,'Cable de red central dañado','El cable de red del area central se encuentra dañado',1,3,16,1,'2025-12-04 18:05:54','2025-12-05 02:05:54','2025-12-05 07:05:54',NULL,NULL,NULL),(44,'Fallo en sistema de impresion PAC','El sistema no responde para la impresion',3,1,17,3,'2025-12-04 19:01:43','2025-12-05 04:01:43','2025-12-05 10:01:43',NULL,NULL,'2025-12-04 19:27:01'),(45,'Error en el sistema de inventario','El sistema no responde a las llamadas',3,1,18,3,'2025-12-04 21:35:06','2025-12-05 06:35:06','2025-12-05 12:35:06',NULL,NULL,'2025-12-04 21:40:44'),(46,'Prueba para traduccion','Probando traduccion',1,4,18,3,'2025-12-04 22:14:39','2025-12-05 06:14:39','2025-12-05 09:14:39',NULL,NULL,'2025-12-04 22:18:50'),(47,'Error software medico','No cargan las imagenes',3,1,18,1,'2025-12-04 23:03:31','2025-12-05 08:03:31','2025-12-05 14:03:31',NULL,NULL,NULL),(48,'No puedo recuperar mi contraseña','Olvide mi contraseña',1,7,18,3,'2025-12-04 23:08:17','2025-12-05 06:53:17','2025-12-05 08:13:17',NULL,NULL,'2025-12-04 23:13:12');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'carlos@correo.com','$2y$10$reh7qnm400VCYxQHTWfsJev2c9jEzlBXqdgkPk.8uQGxJ74v0hpA.','Carlos Gómez',1,'2025-12-04 21:37:53',1,NULL,NULL),(2,'ana@correo.com','$2y$10$W81.MJVWqgAEjFoQFMlHjeSPSnpgLwTctGtF/qu1XZPEQUphs89Gy','Ana Pérez',1,'2025-12-04 21:28:21',1,NULL,NULL),(3,'luis@correo.com','$2y$10$Nc8pKjg0acOOMdAEFe4jj.us0bEaayOPFu3gWg7jESbTUrFRVcx8y','Luis Torres',2,'2025-10-14 12:08:42',1,'ocupado',2),(4,'sofia@correo.com','$2y$10$.9k.XAc5J90TnHi1IgxxoeRZnc0Hx7u590C9dXRLTT.akscfC8AtK','Sofía Ramírez',2,'2025-10-14 12:08:42',1,'ocupado',5),(5,'admin@correo.com','$2y$10$pzhE1vVPb8wxZuo09HbCDejJfXCq32T.RVMq3ZGn/rRj6UBZppSN.','Administrador',3,'2025-12-04 23:25:15',1,NULL,NULL),(6,'Mlopez242@correo.com','$2y$10$J7m2jrwQU9i3o1iE9AGsNOZC396Y2De3qJibZKlSQGG4XqMEWOEv.','María López',1,'2025-10-30 12:13:59',1,NULL,NULL),(8,'carlos.fernandez@pulseit.com','$2y$10$hexOg9XvHCzvKKBQKJ5PtuSh2piY5qHtRp23bMNKTjnrFPaf1F.T2','Carlos Fernández',2,'2025-12-04 21:39:05',1,'disponible',4),(9,'angeliqueseguraaa@icloud.com','$2y$10$YbfXS.2R1o4oagk3vGrt7eWhmO4v.Sor/07HW0vzZLdGUHwFa62Xy','Angelique Segura',2,'2025-11-04 15:38:07',1,'disponible',3),(10,'andreyperez109@gmail.com','$2y$10$yxI6EakulN7TuuKOmZYEMuPiBAdz6qkGNA53ZzLjlQPY3/zhk41Da','Andrey Perez',2,'2025-11-04 15:53:34',1,'disponible',7),(11,'admin2@gmail.com','$2y$10$Ja3dPm1U7R3vGlj2SrQTf.1eRJxPmlErMDeUmdxv7KRzr3iMCnzPa','administrador 2.0',3,'2025-11-04 16:18:25',1,NULL,NULL),(12,'alecod31@pulseit.com','$2y$10$am6aJi6eklA7GRhlyZ.T6uRMJu3xJ2CuZ7wzFGHNghs//FrHig8FC','Alejandro Serrano',2,'2025-11-04 16:20:15',1,'disponible',3),(15,'gael@421example.com','$2y$10$ShB/FQTbyhS7xgwADEddxuKmAINajn0/Bey0Nkd9o4QO1ZFafteN6','Gael Osorio',2,'2025-12-04 23:11:00',1,'disponible',3),(16,'eduardo24@correo.com','$2y$10$IfYMUaIghnwkNEJCit6Tqu78zAszBqx56WU5Z99lWgqAQMkr.edMq','Eduardo Mora',1,'2025-12-04 18:03:26',1,NULL,NULL),(17,'pedroartavia43@gmail.com','$2y$10$kucelN6Ss2xxiR9dOQQWZuzY2PXEB6y1oz14NsbIMT6zDsN5CpoKa','Pedro Artavia',1,'2025-12-04 18:58:36',1,NULL,NULL),(18,'magaliortega@gmail.com','$2y$10$LqGDRyP8rnvtmDT.6GHIx.tukEhWt1ZmoINC.OSzlT4nQmxswlkKW','Magali Ortega',1,'2025-12-04 23:12:44',1,NULL,NULL);
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

-- Dump completed on 2025-12-04 23:34:45
