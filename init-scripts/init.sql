-- init.sql
CREATE TABLE IF NOT EXISTS db_auth (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
