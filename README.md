<b> Homework: Create a MySQL Database. 

# SQL-BAMAZON


<b>Homework assignment covering integrating SQL databases and testing with products.</b>

<b> About </b>

The Bamozon Project is based off a SQL database. I intergrated this database by making a store based off require("console.table") to give the user a more fiendly experience. 
I intergrated inquirer and the method inquirer.prompt to ask the user the ID number they would like to purchase from and the quality. 

<b> Requirements </b>

* The products table should have each of the following columns:
  - item_is (unique id for each product)
  _ product_name (name of the product)
  _ department_name
  _ price (cost to the customer)
  _ stock_quantity (how much of the product is available in stores)

* Populate the database with 10 different products. 

* Creare a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of the products for sale. 

* The application will prompt the user with two messages:
   - Ask the user the ID of the product key they would like to buy. 
   - Ask the user how many units of the product they would like to buy. 
   
* Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request, 
  - If not, the application should log a phrase to the user of insufficient quantity, then prevent the order going through. 
  
* If the store does have enough of the product, the SQL database will reflect the remaining quanitity and will show the customer the total cost of their purchase. 

<h2> Available Scripts </h2>

In this homework you will need to have your server running. 

- I used MAMP in this homework assignment. 

<b> To start the assignment you need: node (nameofthejavascriptfile) - to start the application. 
  
<b> Below are screenshots of the assignment </b> 



<img width="567" alt="Screen Shot 2019-09-09 at 2 19 12 PM" src="https://user-images.githubusercontent.com/48806630/64563600-fd0bfb80-d30c-11e9-8f51-c6fdaf2eb08b.png">


Then based on the user output the UPDATE method in SQL, updated the databased based on the user's choice for purchase. 



Intergrated techlogy
- My SQL workbench 
- MAMP  for my server
- JavaScript 
- JQuery
- JSON 
- JNode
