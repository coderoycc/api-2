create database if not exists companydb;

use companydb;

create table ciudadano(
  ci int(10) not null,
  nombre varchar(45),
  apellido varchar(55),
  fecha_nac date,
  est_civil varchar(20) default null
  constraint pk_ci primary key (ci)
) charset=utf8;

create table dia_fila(
  id_dia int(5) not null AUTO_INCREMENT, 
  objeto varchar(60) not null,
  fecha date not null,
  primary key(id_dia)
) charset=utf8;


