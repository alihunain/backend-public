var express = require('express');
var router = express.Router();
var Testimonial = require('../model/Testimonial.js');


router.get('/list', function(req, res, next) {    
    var response={};
    Testimonial.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : err};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.post('/add',function(req, res){   
    var response={};
    var testim = new Testimonial(req.body);
    testim.save(function(err, data){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
  });


router.put('/:id',function(req, res){   
    var response={};
    Testimonial.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, data) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
});


router.get('/:id',function(req,res){    
    var response={};
    Testimonial.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : err};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});


router.delete('/:id',function(req,res){
    var response={};
    Testimonial.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : err};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});


module.exports = router;