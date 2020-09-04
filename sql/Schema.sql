DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department VARCHAR(30) NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10) NULL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT
);

CREATE TABLE manager (
  id INT PRIMARY KEY AUTO_INCREMENT,
  manager VARCHAR(30) NULL

);







SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;
SELECT * FROM manager
