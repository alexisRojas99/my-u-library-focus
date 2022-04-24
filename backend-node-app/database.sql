--DROP DATABASE IF EXISTS library;
--CREATE DATABASE library;

CREATE TABLE public.roles(
    id serial4 NOT NULL PRIMARY KEY,
    name varchar NOT NULL UNIQUE
);

CREATE TABLE public.users (
    id serial4 NOT NULL PRIMARY KEY,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    id_rol serial4 NOT NULL REFERENCES public.roles(id),
    password varchar NOT NULL
);

CREATE TABLE public.books (
    isbn varchar(13) PRIMARY KEY,
    title varchar(200) NOT NULL,
    author varchar(100) NOT NULL,
    published_year NUMERIC(4),
    genre varchar(100),
    stock BIGINT
);

CREATE TYPE m_types AS ENUM('entry','egress');
CREATE TABLE public.books_records(
    id serial4 NOT NULL PRIMARY KEY,
    id_user serial4 NOT NULL REFERENCES public.users(id),
    isbn varchar(13) NOT NULL REFERENCES public.books(isbn),
    quantity NUMERIC(2),
    movement_type m_types,
    movement_date timestamptz
);






