var express = require('express');
var router = express.Router();
var ingredientsOrderModal  =  require("../model/ingredientsOrder");




router.get('/', function(req, res, next){
    var response={};
    ingredientsOrderModal.find({}).exec(function(err,data){
        if (err) {
        response = {"error" : true,"message" : "Error fetching data"};
        } else{
        response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});
router.post('/',function(req, res){
    var response={};
    var ingredientsOrder = new ingredientsOrderModal(req.body);
    ingredientsOrder.save(function(err, data){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added",data:data};
        }
        res.json(response);
    });
});

router.put('/:id',function(req, res){
    var response={};
    console.log(req.body,req.params.id)
    ingredientsOrderModal.findByIdAndUpdate(req.params.id, req.body, {new: true} ,function(err, data) {
        if(err) {
            response = {"error" : true,"message" : err};
            res.json(response);
        } else {
   
            response = {"error" : false,"message" : data};
            res.json(response);

            }
    });
});
router.get('/owner/:ownerId', function(req, res, next){
    var response={};
    ingredientsOrderModal.findOne({ownerId:req.params.ownerId}).exec(function(err,data){
        if (err) {
        response = {"error" : true,"message" : "Error fetching data"};
        } else{
        response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});
router.get('/:id', function(req, res, next){
    var response={};
    ingredientsOrderModal.findById(req.params.id).exec(function(err,data){
        if (err) {
        response = {"error" : true,"message" : "Error fetching data"};
        } else{
        response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});
router.delete('/:id',function(req,res){
    var response={};
    ingredientsOrderModal.remove({_id:req.params.id}, function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    });
});

module.exports = router;