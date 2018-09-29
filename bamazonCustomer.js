const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });
  
  connection.connect(function (err) {

    if (err) throw err;
    console.log("This connection is on and working.");
    console.log("Initial user input for ID: " + userInputID);


    connection.query('SELECT * FROM products', (err, res) => {
      
      // console.log(res);

      console.log("\n");
      console.log("\n" + "item_id " + "   " + "product_name" + "  " + "department_name" + "   " + "price" + "   " + "stock_quantity");
      console.log("------------------------------------------------------------------------");

      // firstQuestion();
      for (var i = 0; i < res.length; i++) {
        console.log("   " + res[i].item_id + "       " + res[i].product_name + "       " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
      }

  })
  });

  var userInputID = 0;

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

            userInputID = answer.id;
            console.log("Updated user input for ID: " + userInputID);

        var query = "SELECT * FROM products";
        connection.query(query, function(err, res) {

            // console.log(res);
            // secondQuestion();

            // Need a code for this product does not exist.
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