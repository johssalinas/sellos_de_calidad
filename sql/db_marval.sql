-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2023 a las 22:58:48
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_marval`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratista`
--

CREATE TABLE `contratista` (
  `id_contratista` int(11) NOT NULL,
  `descContratista` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contratista`
--

INSERT INTO `contratista` (`id_contratista`, `descContratista`) VALUES
(1, 'Contratista 1'),
(2, 'Contratista 2'),
(4, 'Contratista 3'),
(5, 'Contratista 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etapaproyecto`
--

CREATE TABLE `etapaproyecto` (
  `id_etapa` int(11) NOT NULL,
  `nombre_etapa` varchar(255) NOT NULL,
  `id_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etapaproyecto`
--

INSERT INTO `etapaproyecto` (`id_etapa`, `nombre_etapa`, `id_proyecto`) VALUES
(1, 'Etapa 1', 1),
(2, 'Etapa 2', 1),
(3, 'Etapa 1', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `nombre_proyecto` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre_proyecto`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Proyecto 1', '2023-03-21', '2023-03-16'),
(2, 'Proyecto 2', '2023-03-01', '2023-03-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sellocalidad`
--

CREATE TABLE `sellocalidad` (
  `id_sello` int(11) NOT NULL,
  `nombre_sello` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sellocalidad`
--

INSERT INTO `sellocalidad` (`id_sello`, `nombre_sello`) VALUES
(1, 'Sello 1'),
(2, 'Sello 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidadestomasello`
--

CREATE TABLE `unidadestomasello` (
  `id_unidad` int(11) NOT NULL,
  `nombre_unidad` varchar(255) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `id_etapa` int(11) NOT NULL,
  `id_sello` int(11) NOT NULL,
  `id_contratista` int(11) NOT NULL,
  `seleccionada` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidadestomasello`
--

INSERT INTO `unidadestomasello` (`id_unidad`, `nombre_unidad`, `id_proyecto`, `id_etapa`, `id_sello`, `id_contratista`, `seleccionada`) VALUES
(1, '1', 1, 1, 1, 1, 0),
(2, '2', 1, 1, 1, 1, 0),
(3, '3', 1, 1, 1, 1, 0),
(4, '1', 2, 3, 1, 1, 0),
(5, '2', 2, 3, 2, 2, 0),
(6, '1', 2, 3, 2, 2, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contratista`
--
ALTER TABLE `contratista`
  ADD PRIMARY KEY (`id_contratista`);

--
-- Indices de la tabla `etapaproyecto`
--
ALTER TABLE `etapaproyecto`
  ADD PRIMARY KEY (`id_etapa`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`);

--
-- Indices de la tabla `sellocalidad`
--
ALTER TABLE `sellocalidad`
  ADD PRIMARY KEY (`id_sello`);

--
-- Indices de la tabla `unidadestomasello`
--
ALTER TABLE `unidadestomasello`
  ADD PRIMARY KEY (`id_unidad`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `id_etapa` (`id_etapa`),
  ADD KEY `id_sello` (`id_sello`),
  ADD KEY `id_contratista` (`id_contratista`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contratista`
--
ALTER TABLE `contratista`
  MODIFY `id_contratista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `etapaproyecto`
--
ALTER TABLE `etapaproyecto`
  MODIFY `id_etapa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sellocalidad`
--
ALTER TABLE `sellocalidad`
  MODIFY `id_sello` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `unidadestomasello`
--
ALTER TABLE `unidadestomasello`
  MODIFY `id_unidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `etapaproyecto`
--
ALTER TABLE `etapaproyecto`
  ADD CONSTRAINT `etapaproyecto_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `unidadestomasello`
--
ALTER TABLE `unidadestomasello`
  ADD CONSTRAINT `unidadestomasello_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`),
  ADD CONSTRAINT `unidadestomasello_ibfk_2` FOREIGN KEY (`id_etapa`) REFERENCES `etapaproyecto` (`id_etapa`),
  ADD CONSTRAINT `unidadestomasello_ibfk_3` FOREIGN KEY (`id_sello`) REFERENCES `sellocalidad` (`id_sello`),
  ADD CONSTRAINT `unidadestomasello_ibfk_4` FOREIGN KEY (`id_contratista`) REFERENCES `contratista` (`id_contratista`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
