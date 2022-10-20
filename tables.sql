

create table users(
    users_id serial primary key not null,
    username text unique not null,
    counting int not null
);

