// first wire the js and mysql database 

var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host:"bamazonhw",
    port: 8889,
    database: "bamazon_db"
});

function menu () {
    console.log("menu goes here!");
}
connection.connect(function(){
 console.log(`Connected as id ${connection.threadId}`)
    menu();
});