-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: moe-mysql-app:3306
-- 생성 시간: 20-12-06 09:37
-- 서버 버전: 5.7.32
-- PHP 버전: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `moe_db`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `MOE_ITEM_T`
--

CREATE TABLE `MOE_ITEM_T` (
  `ITEM_NAME` varchar(50) NOT NULL,
  `ITEM_DESC` varchar(100) NOT NULL,
  `ITEM_ONHAND` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `MOE_ITEM_T`
--

INSERT INTO `MOE_ITEM_T` (`ITEM_NAME`, `ITEM_DESC`, `ITEM_ONHAND`) VALUES
('TEST-ITEM-1', 'TEST-ITEM-DESC-1', 10),
('TEST-ITEM-2', 'TEST-ITEM-DESC-2', 20);

-- --------------------------------------------------------

--
-- 테이블 구조 `msg`
--

CREATE TABLE `msg` (
  `PID` bigint(20) UNSIGNED NOT NULL,
  `ChannelType` char(255) DEFAULT NULL COMMENT '채널 타입',
  `ChannelId` char(255) DEFAULT NULL COMMENT '채널 아이디',
  `ChannelName` char(255) DEFAULT NULL COMMENT '채널 이름',
  `GuildId` char(255) DEFAULT NULL COMMENT '길드 아이디',
  `GuildName` char(255) DEFAULT NULL COMMENT '길드 이름',
  `Message` longtext COMMENT '메세지 내용',
  `AuthorId` char(255) DEFAULT NULL COMMENT '작성자 아이디',
  `AuthorUsername` char(255) DEFAULT NULL COMMENT '작성자 유저이름',
  `AuthorBot` tinyint(1) DEFAULT '1' COMMENT '봇 여부',
  `Embed` tinyint(1) DEFAULT '1' COMMENT '봇 여부',
  `CreateTime` char(255) DEFAULT NULL COMMENT '메세지 보낸 시간'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `msg`
--

INSERT INTO `msg` (`PID`, `ChannelType`, `ChannelId`, `ChannelName`, `GuildId`, `GuildName`, `Message`, `AuthorId`, `AuthorUsername`, `AuthorBot`, `Embed`, `CreateTime`) VALUES
(1, 'text', '719017257237479486', '메세지-저장-테스트', '706036758034251856', '__youtube_test', 'ㅣㅏㅓ', '250693463065100298', '나긋해#0367', 0, 0, '2020년 6월 7일 일요일 오후 12:15:38'),
(2, 'text', '719017257237479486', '메세지-저장-테스트', '706036758034251856', '__youtube_test', '[수정됨] ㅣㅏㅓ ㅏㅓㅘㅗㅓㅏㅗ', '250693463065100298', '나긋해#0367', 0, 0, '2020년 6월 7일 일요일 오후 12:16:38');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
