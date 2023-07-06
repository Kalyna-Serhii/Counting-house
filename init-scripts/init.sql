CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(15),
    surname VARCHAR(15),
    phone VARCHAR(15),
    password VARCHAR(255),
    email VARCHAR(50),
    floor INTEGER,
    room INTEGER,
    role VARCHAR(10),
    avatar VARCHAR(255)
);