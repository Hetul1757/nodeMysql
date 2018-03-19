const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/auth');
const con = require("../model/user");

router.get("/", (req, res, next) => {
        con.query("SELECT * FROM customers", function (err, result, fields) {
          if (err){
            res.status(500).json({error:err});
          }else
         { console.log(result);
          res.status(200).json(result);}
        });  
});

router.post("/", (req, res, next) => {
    var sql = "INSERT INTO Customers (username, password) VALUES ('"+req.body.username+"', '"+req.body.password+"')";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err){
        res.status.json({error:err});
      }else{
        var sql = "INSERT INTO Customers (username, password) VALUES ('"+req.body.username+"', '"+hash+"')";   
        console.log(hash);
        con.query(sql, function (err, result) {
          if (err){
            res.status(500).json({ error: err });
          }
          else {
            console.log("1 record inserted");
            res.status(200).json(result);
          }  
        });
      }
    }); 
});

router.post("/login", (req, res, next) => {
  var sql="SELECT * FROM Customers WHERE username ='"+ req.body.username+"'";
      con.query(sql, function (err, result, fields) {
        if (err) {
          res.json({error:err});
        } 
        else if(result[0]==null){
          res.json({message:"username not found please register"});
        }
        else{
          console.log(result);
          if(result[0].password==null) {
            res.json({error:"Not found"});
          }
          bcrypt.compare(req.body.password, result[0].password, function(err, results) {
            if(err){
              res.json({error:err});
            }else{
              if(results==true){
                const token = jwt.sign(
                    {
                      username: result[0].username,
                      ID: result[0].ID
                    },
                    "secret",
                    {
                        expiresIn: "1h"
                    }
                  );
                  res.status(200).json({
                    message: "Auth successful",
                    token: token});
                }else{
                  res.json({message:"Incorrect password"});
                }
              }
            }
          );
       }
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
      var sql="SELECT * FROM Customers WHERE id ="+ req.params.id;
      con.query(sql, function (err, result, fields) {
        if (err) {
          res.json({error:err});
        }else
        {console.log(result);
        res.status(200).json(result);}
      });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  var username=req.body.username;
      var sql="UPDATE customers SET username = '"+req.body.username+"' WHERE id ="+req.params.id+"";
      con.query(sql, function (err, result, fields) {
        if (err) {
          res.json({error:err});
        }
        else{
        console.log(username);
        res.status(200).json(result);}
    });
});

router.delete("/:id", (req, res, next) => {
      var sql="DELETE FROM Customers WHERE id="+req.params.id+"";
      con.query(sql, function (err, result, fields) {
        if (err) {res.json({error:err});
      } else
        {res.status(200).json(result);}
      });
});

module.exports = router;