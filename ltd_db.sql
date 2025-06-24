-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 24/06/2025 às 20:02
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ltd_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `lixeiras`
--

DROP TABLE IF EXISTS `lixeiras`;
CREATE TABLE IF NOT EXISTS `lixeiras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cor` varchar(255) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `zoom` int NOT NULL DEFAULT '14',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `locais`
--

DROP TABLE IF EXISTS `locais`;
CREATE TABLE IF NOT EXISTS `locais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `zoom` int NOT NULL DEFAULT '14',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `locais`
--

INSERT INTO `locais` (`id`, `nome`, `lat`, `lng`, `zoom`) VALUES
(1, 'Praça Batista Campos', -1.459935, -48.489726, 30),
(2, 'Praça da Bandeira', -1.454856, -48.499655, 30),
(3, 'Praça da República', -1.45254, -48.494081, 17),
(4, 'Mangál das Garças', -1.465089, -48.5054, 17),
(5, 'Complexo do Ver-O-Peso', -1.447488, -48.499168, 16),
(6, 'Complexo Feliz Lusitânia', -1.45458, -48.504934, 18),
(7, 'Orla Portal da Amazônia', -1.469925, -48.50215, 16);

-- --------------------------------------------------------

--
-- Estrutura para tabela `local_lixeiras`
--

DROP TABLE IF EXISTS `local_lixeiras`;
CREATE TABLE IF NOT EXISTS `local_lixeiras` (
  `id_local_lixeira` int NOT NULL AUTO_INCREMENT,
  `id_local` int NOT NULL,
  `id_lixeira` int NOT NULL,
  PRIMARY KEY (`id_local_lixeira`),
  UNIQUE KEY `id_local_lixeira` (`id_local_lixeira`),
  KEY `id_local` (`id_local`),
  KEY `id_lixeira` (`id_lixeira`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ranking`
--

DROP TABLE IF EXISTS `ranking`;
CREATE TABLE IF NOT EXISTS `ranking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `score` int NOT NULL,
  `mode` enum('normal','hard') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `ranking`
--

INSERT INTO `ranking` (`id`, `user_id`, `score`, `mode`) VALUES
(3, 2, 280, 'normal'),
(4, 2, 200, 'hard'),
(5, 3, 10, 'normal'),
(6, 4, 10, 'hard'),
(7, 4, 10, 'normal');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idade` smallint NOT NULL,
  `email` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `idade`, `email`) VALUES
(2, 'Davi Assaf', 19, 'daviassafmp1@gmail.com'),
(3, 'lais rocha', 25, 'laiisrrochaa@gmail.com'),
(4, 'Miidas', 20, 'fayalfelipe514@gmail.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
