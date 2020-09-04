USE employee_trackerDB;

INSERT INTO department (department)
VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1), 
("Lead Engineer", 150000, 2), 
("Software Engineer", 120000, 2), 
("Accountant", 125000, 3), 
("Legal Team Lead", 250000, 4), 
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Oscar", "Wilde", 1, 1), 
("James", "Joyce", 2, 2), 
("Clarice", "Lispector", 3, null),
("Jane", "Austen", 4, 1), 
("George", "Orwell", 5, null), 
("Bell", "Hooks", 6, null), 
("Charles", "Dickens", 7, 3), 
("Kurt", "Vonnegut", 5, 4), 
("Maya", "Angelou", 4, 6); 

INSERT INTO manager (manager)
VALUES 
("Clarice Lispector"), 
("Oscar Wilde"), 
("Bell Hooks"), 
("George Orwell"),
("Jane Austen");



