-- @block

create table bookings(
    id serial,
    guest_id int not null,
    room_id int not null,
    check_in date,
    primary key(id),
    FOREIGN key (guest_id) references users(id),
    FOREIGN key (room_id) references rooms(id)
)

-- @block rooms a user has booked
-- joins rooms for user 1
select
    guest_id,
    street,
    check_in
from bookings
inner join rooms on rooms.owner_id = guest_id
where guest_id = 1;

-- @block guests who stayed in room
select
    room_id,
    guest_id,
    email,
    bio
from bookings
inner join users on users.id = guest_id