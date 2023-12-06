

create table users(
    users_id serial primary key not null,
    username text unique not null,
    counting int not null
);

create table users_db(
    users_id serial primary key not null,
    username text unique not null,
    counting int not null
);