-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-01-2023 a las 05:01:13
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `feedback_parking`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parking`
--

CREATE TABLE `parking` (
  `id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ocupada` tinyint(1) DEFAULT NULL,
  `matricula` varchar(15) DEFAULT NULL,
  `marca` varchar(40) DEFAULT NULL,
  `modelo` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parking`
--

INSERT INTO `parking` (`id`, `name`, `ocupada`, `matricula`, `marca`, `modelo`) VALUES
(1, 'plaza1', 0, '', '', ''),
(2, 'plaza2', 0, '', '', ''),
(3, 'plaza3', 0, '', '', ''),
(4, 'plaza4', 0, '', '', ''),
(5, 'plaza5', 0, '', '', ''),
(6, 'plaza6', 0, '', '', ''),
(7, 'plaza7', 0, '', '', ''),
(8, 'plaza8', 0, '', '', ''),
(9, 'plaza9', 0, '', '', ''),
(10, 'plaza10', 0, '', '', ''),
(11, 'plaza11', 0, '', '', ''),
(12, 'plaza12', 0, '', '', ''),
(13, 'plaza13', 0, '', '', ''),
(14, 'plaza14', 0, '', '', ''),
(15, 'plaza15', 0, '', '', ''),
(16, 'plaza16', 0, '', '', ''),
(17, 'plaza17', 0, '', '', ''),
(18, 'plaza18', 0, '', '', ''),
(19, 'plaza19', 0, '', '', ''),
(20, 'plaza20', 0, '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `parking`
--
ALTER TABLE `parking`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `parking`
--
ALTER TABLE `parking`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
