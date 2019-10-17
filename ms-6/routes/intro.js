var express = require('express');
var router = express.Router();
var passport = require('passport');
var settingModel = require('../model/Intro.js');



router.get('/', function(req, res, next) {
    var response={};
    settingModel.find({},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching datas"};
        } else{
            response = {"error" : false,"message" : data};
        };
        console.log(response);
        res.json(response);
    }); 
});
router.post('/',function(req, res){   
    var response={};
    var owner = new settingModel(req.body);

    owner.save(function(err, data){        
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
        });
});
router.delete('/:id',function(req,res){    
    var response={};
    console.log(req.params.id);
    settingModel.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});

module.exports = router;