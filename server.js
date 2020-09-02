const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "mypassword",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  
  function runSearch() {
    inquirer
      .prompt({
        name: "options",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by Department",
          "View all employees by Manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager"
        ]
      })
      .then(function(answers) {
        switch (answers.options) {
        case "View all employees":
          employeesList();
          break;
  
        case "View all employees by Department":
          employeesByDepartment();
          break;
  
        case "View all employees by Manager":
          employeesByManager();
          break;
  
        case "Add employee":
          addEmployee();
          break;
  
        case "Remove employee":
          removeEmployee();
          break;
        
        case "Update employee role":
          updateRole();
          break;

        case "Update employee manager":
            updateManager();
            break;
        }
      });
  }
  
function employeesList() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, manager.manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id ORDER BY employee.id ASC";
    connection.query(query, function (err, res) {
    console.table(res);
        
        runSearch();
    });
}
function employeesByDepartment() {
  inquirer
      .prompt({
        name: "departments",
        type: "rawlist",
        message: "Which department would you like to view?",
        choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal"
        ]
      })
      .then(function(answers) {
        switch (answers.departments) {
          case "Sales":
            let salesQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE department.department = 'Sales' ORDER BY employee.id ASC";
            connection.query(salesQuery, function (err, res) {
            console.table(res);
                
                runSearch();
            });
            break;
    
          case "Engineering":
            let engineeringQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE department.department = 'Engineering' ORDER BY employee.id ASC";
    connection.query(engineeringQuery, function (err, res) {
    console.table(res);
        
        runSearch();
    });
            break;
    
          case "Finance":
            let financeQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE department.department = 'Finance' ORDER BY employee.id ASC";
    connection.query(financeQuery, function (err, res) {
    console.table(res);
        
        runSearch();
    });
            break;
    
          case "Legal":
            let legalQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE department.department = 'Legal' ORDER BY employee.id ASC";
    connection.query(legalQuery, function (err, res) {
    console.table(res);
        
        runSearch();
    });
            break;
    
          }
      });
};

function employeesByManager() {
  inquirer
      .prompt({
        name: "managers",
        type: "rawlist",
        message: "Which manager's team would you like to view?",
        choices: [
          "Ashley Rodriguez", 
          "John Doe", 
          "Sarah Lourd", 
          "Malia Brown",
          "Mike Chan",
          "Kevin Tupik"
        ]
      })
      .then(function(answers) {
        switch (answers.managers) {
          case "Ashley Rodriguez":
            let query1 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE manager.manager = 'Ashley Rodriguez' ORDER BY employee.id ASC";
            connection.query(query1, function (err, res) {
            console.table(res);
                
                runSearch();
            });
            break;
    
          case "John Doe":
            let query2 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE manager.manager = 'John Doe' ORDER BY employee.id ASC";
            connection.query(query2, function (err, res) {
            console.table(res);
        
        runSearch();
    });
            break;
    
          case "Sarah Lourd":
            let query3 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE manager.manager = 'Sarah Lourd' ORDER BY employee.id ASC";
            connection.query(query3, function (err, res) {
            console.table(res);
        
        runSearch();
    });
            break;
    
          case "Malia Brown":
            let query4 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE manager.manager = 'Malia Brown' ORDER BY employee.id ASC";
            connection.query(query4, function (err, res) {
            console.table(res);
        
        runSearch();
    });
            break;

            case "Mike Chan":
              let query5 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE manager.manager = 'Mike Chan' ORDER BY employee.id ASC";
              connection.query(query5, function (err, res) {
              console.table(res);
          
          runSearch();
      });
              break; 
              
              case "Kevin Tupik":
              let query6 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id WHERE manager.manager = 'Kevin Tupik' ORDER BY employee.id ASC";
              connection.query(query6, function (err, res) {
              console.table(res);
          
          runSearch();
      });
              break;
    
          }
      });
};




    //     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT position, song, year FROM top5000 WHERE ?";
//         connection.query(query, { artist: answer.artist }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].artist);
//       }
//       runSearch();
//     });
//   }
  
//   function rangeSearch() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//                 res[i].position +
//                 " || Song: " +
//                 res[i].song +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Year: " +
//                 res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         });
//       });
//   }
  
//   function songAndAlbumSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//         query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//         query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
  
//         connection.query(query, [answer.artist, answer.artist], function(err, res) {
//           console.log(res.length + " matches found!");
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               i+1 + ".) " +
//                 "Year: " +
//                 res[i].year +
//                 " Album Position: " +
//                 res[i].position +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Song: " +
//                 res[i].song +
//                 " || Album: " +
//                 res[i].album
//             );
//           }
  
//           runSearch();
//         });
//       });
//   }
  


