CREATE TYPE user_gender AS ENUM ('man', 'woman');
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(15),
    surname VARCHAR(15),
    gender user_gender,
    phone VARCHAR(10),
    password VARCHAR(60),
    email VARCHAR(50),
    floor INTEGER,
    room INTEGER,
    role user_role,
    avatar VARCHAR(255)
);
