var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "root",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("This connection is on and working.")
    showProductList();
  });

  function showProductList() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);

      firstQuestion();
      
      // the connection is terminated now. 
      // connection.end();
    });
  }

  function firstQuestion() {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        })
      .then(function(answer) {
        var query = "SELECT position FROM products WHERE ?";
        connection.query(query, { position: answer.id }, function(err, res) {
            // if (answer.id === res[this].position) {
            //     secondQuestion();
            // }

            // if query is successful..
            secondQuestion();

            if (err) {
              console.log("This product does not exist.")
            }
        });
      });
  }

  function secondQuestion() {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "How many units of this product would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        })
      .then(function(answer) {
        var query = "SELECT quantity FROM products WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
            if (answer.id < res[this].position) {
                updateProduct();
            }
            else {
              console.log("There is not enough stock for this product.");
            }
        });
      });
  }
  
  function updateProduct() {
    console.log("Updating Product Quantity...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          flavor: "Rocky Road"
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
    )};