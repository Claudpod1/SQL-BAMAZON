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

                }
                inquirer.prompt({
                    type: "number",
                    name: "Units_to_buy",
                    message: "How many units of the product would you like to buy?"
                }).then(function (responsetwo) {
                    connection.query("SELECT stock_quantity FROM products WHERE ?", { id: response.Id_to_buy }, function (err, res2) {
                        if (err) throw err;


                        // console.log(" what is res2 " + res2);

                        // console.log(" what is res " + res);

                        // console.log(res[0].stock_quantity);

                        // / check to see that responsetwo.Units_to_buy is less than or equal to res[0].stock_quantity if
                        if (responsetwo.Units_to_buy <= res[0].stock_quantity) {

                            var newTotal = res[0].stock_quantity - responsetwo.Units_to_buy 
                            // console.log("MATH" + newTotal);


                            // console.log("res2: ", responsetwo.Units_to_buy)
                            // console.log("res0: ", res[0].stock_quantity)
                            // console.log("There is pretty in stock for purchase");
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
                                    console.log("Your product was successfully purchased");
                                    connection.query("SELECT * FROM products;", function(err, res)
                                    {
                                        // console.log(res)
                                    })
                                    
                                }
                            );
                        } else {
                            if (err) throw err;

                            console.log("There is not enough in stock, please put in a quality that is availble. ")
                        }
                        


                     }
//                     //  connection.end();

                
//                         //          else {
//                         //     console.log("The purchase could not be completed. Please try again");
//                         //     showAll();
//                         // }
//                         // tell the user the purchase  and the total x amount of things 
//                         //  purchase total

                    )
                });
            });
        });
    });
}
