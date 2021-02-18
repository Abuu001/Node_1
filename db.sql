CREATE DATABASE node112;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
     
CREATE TABLE lessons(
   lesson_id BiGSERIAL PRIMARY KEY  ,
    id uuid  DEFAULT  uuid_generate_v4 () ,
    lesson_name TEXT NOT NULL ,
    time_stamp  VARCHAR(17) NOT NULL
);

CREATE TABLE messages(
    id uuid  DEFAULT  uuid_generate_v4 () ,
    sender VARCHAR(50) NOT NULL ,
    text_field  TEXT NOT NULL,
    time_sent VARCHAR(17) ,
    lesson_fk  BiGSERIAL,
   CONSTRAINT lesson_fk FOREIGN KEY(lesson_fk)  REFERENCES lessons(lesson_id) ON DELETE CASCADE
);
 
INSERT INTO lessons(lesson_name,time_stamp) VALUES('MATH','10 .20 pm');

SELECT  lesson_name,lesson_id,lesson_fk,time_stamp,sender,text_field FROM lessons LEFT JOIN messages ON lesson_id=lesson_fk;
 
CREATE TABLE users(
    id uuid  DEFAULT  uuid_generate_v4 () ,
    users_id BIGSERIAL,
    username VARCHAR(70) UNIQUE NOT NULL,
    user_password  VARCHAR(70) NOT NULL
);

