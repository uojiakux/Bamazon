const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });
  
// START APP

  connection.connect(function (err) {

    if (err) throw err;
    // console.log("This connection is on and working.");
    // console.log("Initial user input for ID: " + userInputID);


    connection.query('SELECT * FROM products', function (err, res) {
      
      // console.log(res);

      console.log("\n");
      console.log("\n" + "item_id " + "   " + "product_name" + "  " + "department_name" + "   " + "price" + "   " + "stock_quantity");
      console.log("-------------------------------------------------------------------------------------------");


      for (var i = 0; i < res.length; i++) {
        console.log("   " + res[i].item_id + "       " + res[i].product_name + "       " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
      }

      firstQuestion();
  })
  });

  // INITIATE QUESTIONS

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
            // console.log("Updated user input for ID: " + userInputID);

        var query = "SELECT product_name, price, stock_quantity FROM products WHERE item_id = ?";
        connection.query(query, userInputID, function(err, res) {


            console.log("\n" + res[0].product_name + "  |  " + "Price: " + res[0].price + "  |  " + "Stock Quantity: " + res[0].stock_quantity + "\n\n");
            secondQuestion();

            var price = res[0].price;
            var stock = res[0].stock_quantity;
            // Could not get the following to work
            // if (err) console.log("This product does not exist");
            // if (res === []) console.log("This product does not exist");
       
                              function secondQuestion() {
                                inquirer
                                  .prompt({
                                    name: "desiredAmount",
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
                                        if (answer.desiredAmount < res[0].stock_quantity) {

                                          function updateProduct() {
                                            stock -=  answer.desiredAmount;
                                        
                                            var updateQuery = connection.query(
                                              "UPDATE products SET ? WHERE item_id = ?",
                                                    [
                                                      {
                                                        stock_quantity: stock
                                                      },
                                                      {
                                                        userInputID
                                                      }
                                                    ],
                                        
                                              function(err, res) {

                                                var priceForCustomer = answer.desiredAmount * price;
                                                console.log("\n Your total cost wil be $" + priceForCustomer + "\n\n\n");


                                                console.log("Updating Product Quantity...");

                                              
                                                ShowNewStoreProducts();
                                              }
                                            )};

                                            updateProduct();

                                        }
                                        else {
                                          console.log("There is not enough stock for this product. \n");
                                          secondQuestion();
                                        }
                                    });
                                  };  
             
             
             })

        });
  }
  
  // I could not get the updated Table to show. If I had more time I would fix this. 
  function ShowNewStoreProducts(){
  connection.query('SELECT * FROM products', function (err, res) {
      
    // console.log(res);

    console.log("\n");
    console.log("\n" + "item_id " + "   " + "product_name" + "  " + "department_name" + "   " + "price" + "   " + "stock_quantity");
    console.log("-------------------------------------------------------------------------------------------");


    for (var i = 0; i < res.length; i++) {
      console.log("   " + res[i].item_id + "       " + res[i].product_name + "       " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
    }

    firstQuestion();
})}
