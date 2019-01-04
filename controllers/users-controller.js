// let express = require('express');
// let express = require('express');
// let router = express.Router();
// let mongoose = require('mongoose');
let users = require('../models/users');

exports.getAllUsers = (req,resp) => {
    
      users.find({}, (err,data) => {
            resp.json(extractData(err , data));  


      });
}

exports.createUser = (req,resp) => {

      let nUser = new users(req.body)

      nUser.save((err, data) => {
            resp.json(extractData(err, data));
      });

}

function extractData (err, data) {


      if (err)
             return err ;
      return data ;

}
