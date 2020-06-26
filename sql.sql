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



CREATE TABLE COVID_19_JHU.Data_US (
	id INT auto_increment NOT NULL,
	Province_State varchar(100) NULL,
	Country_Region varchar(100) NULL,
	Last_Update DATETIME NULL,
	Lat varchar(100) NULL,
	`Long` varchar(100) NULL,
	Confirmed INT NULL,
	Deaths INT NULL,
	Recovered INT NULL,
	Active INT NULL,
	FIPS varchar(100) NULL,
	Incident_Rate FLOAT NULL,
	People_Tested INT NULL,
	People_Hospitalized INT NULL,
	Mortality_Rate FLOAT NULL,
	UID varchar(100) NULL,
	ISO3 varchar(100) NULL,
	Testing_Rate FLOAT NULL,
	Hospitalization_Rate FLOAT NULL,
	CONSTRAINT Data_US_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;