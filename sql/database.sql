DROP DATABASE IF EXISTS db_node;
CREATE DATABASE IF NOT EXISTS db_node;
USE db_node;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    deleted_at DATETIME(3) NULL,
    name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL
);

CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    deleted_at DATETIME(3) NULL,
    title VARCHAR(80) NOT NULL,
    body VARCHAR(80) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY ( user_id ) REFERENCES users ( id )
);