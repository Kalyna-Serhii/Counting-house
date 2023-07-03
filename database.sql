create TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    floor INTEGER,
    room INTEGER,
    role VARCHAR(255),
    avatar BYTEA
);