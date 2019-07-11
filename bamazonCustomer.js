// first wire the js and mysql database 

var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "bamazonhw",
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
    startBamazon();
});

function startBamazon() {
    inquirer.prompt({
        type: "list",
        name: "choicesoption",
        message: "Come check out the amazing products at Bamazon, which product would you liek to search first?",
        choices: ["Shop by the department", "Shop by the product"]

    }).then(function (response) {
        switch (response.choicesoption) {
            case "Shop by the department":
                return shopDept();

            case "Shop by the product":
                return shopProduct();

            default:
                connection.end();

        };
    });
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
        }).then(function(reponse){
            console.log("Ive made it this far")
        })


})


function shopProduct() {

}

// function buyProduct(){
}
// 