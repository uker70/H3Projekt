CREATE DATABASE aobe;
USE aobe;
CREATE TABLE `users` (
  `userId` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50),
  `password` varchar(80),
  `userLevel` int
);

CREATE TABLE `staff` (
  `staffId` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int UNIQUE,
  `name` varchar(15),
  `phoneNum` varchar(15)
);

CREATE TABLE `incident` (
  `incidentId` int PRIMARY KEY AUTO_INCREMENT,
  `description` text,
  `incidentDate` datetime,
  `percentage` json,
  `status` int,
  `location` int,
  `staffId` int UNIQUE,
  `imgId` int UNIQUE
);

CREATE TABLE `status` (
  `statusId` int PRIMARY KEY AUTO_INCREMENT,
  `statusName` text
);

CREATE TABLE `aobe` (
  `aobeId` int PRIMARY KEY AUTO_INCREMENT,
  `ip` text,
  `location` int,
  `aobeName` text
);

CREATE TABLE `location` (
  `locationId` int PRIMARY KEY AUTO_INCREMENT,
  `areaName` text
);

CREATE TABLE `messages` (
  `messageId` int PRIMARY KEY AUTO_INCREMENT,
  `senderId` int,
  `recepientId` int,
  `message` text,
  `readState` bool
);

CREATE TABLE `caseImg` (
  `caseId` int PRIMARY KEY AUTO_INCREMENT,
  `img` blob
);

ALTER TABLE `incident` ADD FOREIGN KEY (`location`) REFERENCES `location` (`locationId`);

ALTER TABLE `aobe` ADD FOREIGN KEY (`location`) REFERENCES `location` (`locationId`);

ALTER TABLE `staff` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `incident` ADD FOREIGN KEY (`status`) REFERENCES `status` (`statusId`);

ALTER TABLE `incident` ADD FOREIGN KEY (`staffId`) REFERENCES `staff` (`staffId`);

ALTER TABLE `messages` ADD FOREIGN KEY (`senderId`) REFERENCES `users` (`userId`);

ALTER TABLE `messages` ADD FOREIGN KEY (`recepientId`) REFERENCES `users` (`userId`);

ALTER TABLE `incident` ADD FOREIGN KEY (`imgId`) REFERENCES `caseImg` (`caseId`);
