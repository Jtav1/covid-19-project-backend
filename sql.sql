-- COVID_19_JHU.`Data` definition

CREATE TABLE `Data` (
  `Date` date NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updated` date DEFAULT NULL,
  `confirmed` int(11) DEFAULT NULL,
  `deaths` int(11) DEFAULT NULL,
  `recovered` int(11) DEFAULT NULL,
  `fips` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `NewTable_id_IDX` (`id`) USING BTREE,
  KEY `Data_Date_IDX` (`Date`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- COVID_19_JHU.Data_US definition

CREATE TABLE `Data_US` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Province_State` varchar(100) DEFAULT NULL,
  `Country_Region` varchar(100) DEFAULT NULL,
  `Last_Update` datetime DEFAULT NULL,
  `Lat` varchar(100) DEFAULT NULL,
  `Long` varchar(100) DEFAULT NULL,
  `Confirmed` int(11) DEFAULT NULL,
  `Deaths` int(11) DEFAULT NULL,
  `Recovered` int(11) DEFAULT NULL,
  `Active` int(11) DEFAULT NULL,
  `FIPS` varchar(100) DEFAULT NULL,
  `Incident_Rate` float DEFAULT NULL,
  `People_Tested` int(11) DEFAULT NULL,
  `People_Hospitalized` int(11) DEFAULT NULL,
  `Mortality_Rate` float DEFAULT NULL,
  `UID` varchar(100) DEFAULT NULL,
  `ISO3` varchar(100) DEFAULT NULL,
  `Testing_Rate` float DEFAULT NULL,
  `Hospitalization_Rate` float DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;