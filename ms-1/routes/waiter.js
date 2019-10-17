var express = require('express');
var router = express.Router();
var waiterModel  =  require("../model/waiter.js");
var emails = require('../mail/emailConfig.js');


router.post('/',function(req, res){
    var response={};
    req.body.username = req.body.email;
    var waiter = new waiterModel(req.body);
    waiter.save(function(err, data){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            if(req.body.email && req.body.username && data._id){
            // emails.driveremailShoot(req.body.email, req.body.username, data._id);
            // emails.emailAdminDriverShoot(req.body.username);
            }
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});


module.exports = router;