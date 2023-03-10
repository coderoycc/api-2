create database if not exists companydb;

use companydb;

create table user(
  ci int(10) not null,
  name varchar(90),
  birth_date date,
  primary key (ci)
) charset=utf8;

create table service(
  id_serv int(3) not null AUTO_INCREMENT, 
  descrip varchar(60) not null,
  primary key(id_dia)
) charset=utf8;


create table queue(
  id_q int(3) not null AUTO_INCREMENT,
  quantity int not null,
  date_q date not null,
  id_serv int(3) not null,
  primary key(id_q),
  foreign key id_serv references service(id_serv)
) charset=utf8;

create table token(
  ci int(10) not null,
  id_q int(3) not null,
  nro int not null,
  primary key(ci, id_q) references user(ci) queue(id_q); 
) charset=utf8;