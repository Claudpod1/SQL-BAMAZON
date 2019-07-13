// first wire the js and mysql database 

var mysql = require("mysql");

var inquirer = require("inquirer");

require("console.table");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    showAll();
});

function showAll() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        console.table(data);

        inquirer.prompt({
            type: "number",
            name: "Id_to_buy",
            message: " The ID of the product you would like to buy?"

        }).then(function (response) {
            connection.query("SELECT * FROM products WHERE ?", { id: response.Id_to_buy }, function (err, res) {
                if (err) throw err;
                if (res.length === 0) {
                    
                    console.log(`Please enter a valid product id`)
                    return showAll();

                }
                var productName = res[0].product_name
                var cost = res[0].price 
                
                inquirer.prompt({
                    type: "number",
                    name: "Units_to_buy",
                    message: "How many units of the product would you like to buy?"
                }).then(function (responsetwo) {
                    connection.query("SELECT stock_quantity FROM products WHERE ?", { id: response.Id_to_buy }, function (err, res2) {
                        if (err) throw err;


                        if (responsetwo.Units_to_buy <= res[0].stock_quantity) {

                            var newTotal = res[0].stock_quantity - responsetwo.Units_to_buy

                          
                 
                            connection.query(

                                //needs to update the stock quantity
                                "UPDATE products SET ? WHERE ?",

                                [
                                    {
                                        stock_quantity: newTotal

                                    },

                                    {
                                        id: response.Id_to_buy
                                    }

                                ],
                                function (err) {
                                    if (err) throw err;
                                
                                 
                                    console.log(`You just purchased ${responsetwo.Units_to_buy} items of ${productName} for ${cost * responsetwo.Units_to_buy}`);
                                    connection.end();

                                    
                                }
                            );
                        } else {
                            if (err) throw err;

                            console.log("There is not enough in stock, please put in a quality that is availble. ")
                       

                            connection.end();

                           
                        }
                    });
                });
            });
        });
    });
}
