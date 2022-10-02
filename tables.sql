create database my_greetings;
\c my_greetings;

create table users(
    users_id serial primary key,
    username text unique not null,
    counting int
);

