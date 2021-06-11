-- @block
-- relationship connects one table to another
--uses a foreign key to establish this relation
create table rooms(
    id serial,
    street VARCHAR(255),
    owner_id INT not null,
    primary key(id),
    foreign key (owner_id) 
        REFERENCES Users(id)
)

-- @block
insert into rooms( owner_id, street)
values
    (1, 'san diego sailboat'),
    (1, 'nantucket cottage'),
    (1, 'vail cabin'),
    (1, 'sf cardboard box');

-- @block
--joining tables by reading two tables and combine them in a certain way
select * from users
inner join rooms
on rooms.owner_id = users.id

-- @block
--joining tables by reading two tables and combine them in a certain way
--INNER JOIN joins two tables on a condition and join all data from left table and right table that matches that condition
select * from users
inner join rooms
on rooms.owner_id = users.id

-- @block
--LEFT JOIN joins two tables on a condition and join all data from left table and uses null if no data is found
select * from users
left join rooms
on rooms.owner_id = users.id

-- @block
--right JOIN joins two tables on a condition and join all data from right table and uses null if no data is found
select * from users
right join rooms
on rooms.owner_id = users.id

-- @block
-- joins all right and all left on match condition
select * from users
FULL join rooms
on rooms.owner_id = users.id

-- @block

select 
    users.id as user_id,
    rooms.id as room_id,
    email,
    street
from users
inner join rooms on rooms.owner_id = users.id