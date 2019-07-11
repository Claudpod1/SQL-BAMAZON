// first wire the js and mysql database 

var mysql = require("mysql");

var inquirer = require("inquirer");

require ("console.table");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889,
    database: "bamazon_db"
});

// function menu () {
//     console.log("menu goes here!");
// }
// connection.connect(function(){
//  console.log(`Connected as id ${connection.threadId}`)
//     menu();
// });

connection.connect(function (err) {
    if (err) throw err;
    showAll();
});

// function startBamazon() {
//     inquirer.prompt({
//         type: "list",
//         name: "choicesoption",
//         message: "Come check out the amazing products at Bamazon, which product would you like to search first?",
//         choices: ["Shop by the department", "Shop by the product"]

//     }).then(function (response) {
//         switch (response.choicesoption) {
//             case "Shop by the department":
//                 return shopDept();

//             case "Shop by the product":
//                 return shopProduct();

//             default:
//                 connection.end();

//         };
//     });
// }

function showAll (){
    connection.query("SELECT * FROM products", function(err,data){
        if (err) throw err;

        console.table(data);
        
        inquirer.prompt({
            type:"number",
            name:"Id_to_buy",
            message: " The ID of the product you would like to buy?"

        }).then(function(response){
            connection.query("SELECT * FROM products WHERE ?", {id: response.Id_to_buy}, function(err,res){
                if (err) throw err; 

                if(res.length === 0){
                    console.log(`Please enter a valid product id`)

                }
            inquirer.prompt({
                type:"number",
                name:"Units_to_buy",
                message:"How many units of the product would you like to buy?"
            }).then(function(responsetwo){
                connection.query("SELECT stock_quantity FROM products WHERE ?", {id: response.Id_to_buy}, function(err,res2){
                    if (err) throw err;
                    console.log(res);
                    
                    console.log(res[0].stock_quantity);

                    

                    // check to see that responsetwo.Units_to_buy is less than or equal to res[0].stock_quantity if
                    //needs to update the stock quantity
                    // tell the user the purchase  and the total x amount of things 
                    //  purchase total
                    // connection.end();
            })
        })   
            })
        })
    })
}


function shopDept() {
    connection.query(" SELECT * FROM products", function (err,data){
        if (err) throw err;
         
        inquirer.prompt({
            type:"list",
            name: "Department",
            message: "What department would you like to shop from?",
            choices: function(){
                var department = data.map(function(product){
                    return product.department_name
                });
                
                return department.filter (function (item, index){
                   return department.indexOf(item) >= index;
                });
            }
        }).then(function(response){
            console.log(response);
            // ///// should I have a query here ?????????
            connection.query("SELECT * FROM products WHERE ?", {department_name: response.Department}, function (err,res){
                if (err) throw err;

                 console.table(res);
                
            })
        })


})


function shopProduct() {

}

// function buyProduct(){
}
// 



