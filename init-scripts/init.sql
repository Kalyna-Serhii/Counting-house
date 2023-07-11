CREATE TYPE user_gender AS ENUM ('man', 'woman');
CREATE TYPE user_role AS ENUM ('user', 'osbb', 'admin');
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(15),
    surname VARCHAR(15),
    gender user_gender,
    phone VARCHAR(15),
    password VARCHAR(255),
    email VARCHAR(50),
    floor INTEGER,
    room INTEGER,
    role user_role,
    avatar VARCHAR(255)
);
