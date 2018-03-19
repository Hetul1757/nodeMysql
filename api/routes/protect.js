const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/auth');
const con = require("../model/user");

  router.get("/", checkAuth, (req, res, next) => {
    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err){
        res.status(500).json({error:err});
      }else
     { console.log(result);
      res.status(200).json(result);}
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

module.exports = router;
