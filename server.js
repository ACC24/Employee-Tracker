const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// const view = require("./view");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mypassword",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  init();
});

function init() {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all roles",
        "View all departments",
        "View all employees",
        "View all employees by Department",
        "View all employees by Manager",
        "View all employees by Role",
        "Add employee",
        "Add role",
        "Add department",
        "Remove employee",
        "Remove role",
        "Remove department",
        "Update employee's role",
        "Update employee's manager",
        "View department's total utilized budget",
        "Exit"
      ]
    })
    .then(function (answers) {
      switch (answers.options) {

        case "View all roles":
          viewRoles();
          break;

        case "View all departments":
          viewDepartments();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "View all employees by Department":
          employeesByDepartment();
          break;

        case "View all employees by Manager":
          employeesByManager();
          break;

        case "View all employees by Role":
          employeesByRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Add role":
          addRole();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Remove employee":
          removeEmployee();
          break;

        case "Remove role":
          removeRole();
          break;

        case "Remove department":
          removeDepartment();
          break;

        case "Update employee's role":
          updateRole();
          break;

        case "Update employee's manager":
          updateManager();
          break;

        case "View department's total utilized budget":
          departmentBudget();
          break;
        
        case "Exit":
          connection.end();
          break;

        // default: 
        // return exitApp();
      }
    });
}
function viewRoles() {
  const query = "SELECT role.id, role.title, role.salary, department.department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id ASC";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("\n ----------------------------------------\n");
    console.table(res);
    init();
  });
};

function viewDepartments() {
  const query = "SELECT * FROM department ORDER BY id ASC";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("\n ----------------------------------------\n");
    console.table(res);
    init();
  });
};

function viewEmployees() {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, manager.manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id ORDER BY employee.id ASC";
  connection.query(query, function (err, res) {
    if (err) throw err; 
    console.log("\n ------------------------------------------------------------------------\n");   
    console.table(res);
    init();
  });
};

function employeesByDepartment() {
  inquirer
    .prompt({
      name: "departments",
      type: "list",
      message: "Which department would you like to view?",
      choices: [
        "Sales",
        "Engineering",
        "Finance",
        "Legal"
      ]
    })
    .then(function (answers) {
      let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE department.department = ? ORDER BY employee.id ASC";
      let departments = answers.departments
      connection.query(query, departments, function (err, res) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        console.table(res);
        init();
      });
    });
};

function employeesByManager() {
  inquirer
    .prompt({
      name: "managers",
      type: "list",
      message: "Which manager's team would you like to view?",
      choices: [
        "Ashley Rodriguez",
        "John Doe",
        "Sarah Lourd",
        "Malia Brown",
        "Mike Chan",
        "Kevin Tupik",
      ]
    })
    .then(function (answers) {
      let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE manager.manager = ? ORDER BY employee.id ASC";
      let managers = answers.managers
      connection.query(query, managers, function (err, res) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        console.table(res);
        init();
      });
    });
};

function employeesByRole() {
  inquirer
    .prompt({
      name: "roles",
      type: "list",
      message: "Which role would you like to view?",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Accountant",
        "Legal Team Lead",
        "Lawyer"
      ]
    })
    .then(function (answers) {
      let query = "SELECT employee.id, employee.first_name, employee.last_name, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE role.title = ? ORDER BY employee.id ASC";
      let roles = answers.roles
      connection.query(query, roles, function (err, res) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        console.table(res);
        init();
      });
    });
};

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "employeeRole",
        type: "input",
        message: "What is the employee's role id number?",
      },
      {
        name: "employeeManager",
        type: "input",
        message: "Who is the employee's manager id number?",
      }])
    .then(function (answers) {
      let newEmployee = {
        firstName: answers.firstName,
        lastName: answers.lastName,
        role: answers.employeeRole,
        manager: answers.employeeManager
      }
      var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) Values (?, ?, ?, ?)";
      connection.query(query, [newEmployee.firstName, newEmployee.lastName, newEmployee.role, newEmployee.manager], function (err) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        viewEmployees();
      });
    });
};

function addRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What role would you like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for that role?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the department's id for that role?"
      },
    ])
    .then(function (answers) {
      let newRole = {
        title: answers.newRole,
        salary: answers.salary,
        department: answers.department
      }
      var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [newRole.title, newRole.salary, newRole.department], function (err) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        viewRoles();
      });
         });
};

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?"
      },
    ])
    .then(function (answers) {
      const newDepartment = answers.newDepartment;
      var query = "INSERT INTO department(department) VALUES (?)";
      connection.query(query, newDepartment, function (err) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        viewDepartments();
      });
    });
};

function removeEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
    ])
    .then(function (answers) {
      let firstName = answers.firstName;
      let lastName = answers.lastName;
      let query = "DELETE FROM employee WHERE first_name = ? AND last_name = ?";;
      connection.query(query, [firstName, lastName], function (err) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        viewEmployees();
      });
    });
};

function removeRole() {
  inquirer
    .prompt([
      {
        name: "removeRole",
        type: "input",
        message: "What role would you like to remove?"
      },
    ])
    .then(function (answers) {
      let removedRole = answers.removeRole;
      var query = "DELETE FROM role WHERE title = ?";
      connection.query(query, removedRole, function (err) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        viewRoles();
      });
    });
};

function removeDepartment() {
  inquirer
    .prompt([
      {
        name: "removeDepartment",
        type: "input",
        message: "What department would you like to remove?"
      },
    ])
    .then(function (answers) {
      let removedDepartment = answers.removeDepartment;
      const query = "DELETE FROM department WHERE department = ?";
      connection.query(query, removedDepartment, function (err) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        viewDepartments();
      });
    });
};

function updateRole() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "updateRole",
        type: "input",
        message: "What is the id of the new role you would like to assign to the employee?"
      },
    ])
    .then(function (answers) {
      let updatedRole = answers.updateRole;
      let firstName = answers.firstName;
      let lastName = answers.lastName;
      const query = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";

      connection.query(query, [updatedRole, firstName, lastName], function (err) {
        if (err) throw err;
        console.log("\n ----------------------------------------\n");
        viewEmployees();
      });
    });
};

function updateManager() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "updateManager",
        type: "input",
        message: "What is the id of the new manager you would like to assign to the employee?"
      },
    ])
    .then(function (answers) {
      let updatedManager = answers.updateManager;
      let firstName = answers.firstName;
      let lastName = answers.lastName;
      const query = "SELECT department_id, department.department, SUM(role.salary) as total_budget FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id ORDER BY department.id ASC";
      connection.query(query, [updatedManager, firstName, lastName], function (err) {
        if (err) throw err;
        console.log("\n -----------------------------------------------------------\n");
        viewEmployees();
      });
    });
};

function departmentBudget() {
  const query = "SELECT department.department, SUM(role.salary) as total_budget FROM employee, role, department WHERE employee.role_id = role.id AND role.department_id = department.id GROUP BY department.department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("\n ----------------------------------------\n");
    console.table(res);
    init();
  });
};



























