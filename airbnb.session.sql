-- @block 
--creation of TABLE
CREATE TABLE Users(
    id SERIAL  PRIMARY KEY ,
    email varchar(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)
);

-- @block
-- insertion
INSERT INTO Users(
    email,bio, country
)
VALUES
    ('loivp@gmail.com', 'fo', 'US'),
    ('hola@gmail.com', 'ba', 'mX'),
    ('frac@gmail.com', 'baz', 'FR');

-- @block
-- retreiving
SELECT * FROM Users;

-- @block
--retreiving by asc and setting limit
select email, id from Users 
order by id ASC
limit 2;

-- @block
--retreiving with a condition WHERE
select email, id, country from Users 

where country = 'US'
order by id ASC
limit 2;


-- @block
--retreiving with two condition WHERE and OR
select email, id, country from Users 

where country = 'US' 
OR id > 1

order by id ASC
limit 2;

-- @block
--retreiving with condition with patterns with LIKE
select email, id, country from Users 

where country = 'US' 
AND email like 'l%'

order by id ASC
limit 2;

-- @block
--retreiving things quicker coming with a cost of memory and write speed. create index first
create INDEX email_index On Users(email)