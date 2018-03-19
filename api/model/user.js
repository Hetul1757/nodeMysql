const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rays@123",
    database: "hss"
  });

  con.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log("Error connecting database ... nn");    
    }
  });

  module.exports = con;