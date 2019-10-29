var express = require('express');
var router = express.Router();
var driverModel  =  require("../model/Driver.js");
var emails = require('../mail/emailConfig.js');


    router.get('/', function(req, res, next){
        var response={};
        
        driverModel.find({}, null, {sort:{created_at: 1 }}).exec(function(err,data){
            if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
            } else{
            response = {"error" : false,"message" : data};
            };
            res.json(response);
        });
    });

   /* router.get('/ownerDriver/:id', function(req, res, next){
        var response={};
        driverModel.find({'kitchenallow.resId':req.params.id, 'kitchenallow.status':true}, null, {sort:{created_at: 1 }}).exec(function(err,data){
            if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
            } else{
            response = {"error" : false,"message" : data};
            };
            res.json(response);
        });
    });*/
    
 router.post('/',function(req, res){
        var response={};
        req.body.username = req.body.email;
        var driver = new driverModel(req.body);
        driver.save(function(err, data){
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                if(req.body.email && req.body.username && data._id){
                emails.driveremailShoot(req.body.email, req.body.username, data._id);
                emails.emailAdminDriverShoot(req.body.username);
                }
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

    //Unique user validate
     router.get('/username/:username',function(req,res){
        var response = {};
        console.log(req.params.username);
        driverModel.find({username:req.params.username.toLowerCase()}).exec(function(err,data){
            if (err) {
                response = {"error" : true,"message" : err};
                res.json(response);
            } else{
                if(data.length > 0){
                    response = {"error" : true,"message" : 1}; 
                    res.json(response);
                }  else{
                    response = {"error" : false,"message" : 0}; 
                    res.json(response);
                }
            };
        });
    });

      //Unique Email validate
     router.get('/email/:email',function(req,res){
        var response = {};
        driverModel.find({email:req.params.email.toLowerCase()}).exec(function(err,data){
            if (err) {
                response = {"error" : true,"message" : err};
                res.json(response);
            } else{
                if(data.length > 0){
                    response = {"error" : true,"message" : 1}; 
                    res.json(response);
                }  else{
                    response = {"error" : false,"message" : 0}; 
                    res.json(response);
                }
            };
        });
    });



    router.put('/:id',function(req, res){
        var response={};
        driverModel.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
            if(err) {
                response = {"error" : true,"message" : err};
                res.json(response);
            } else {
                driverModel.findById(req.params.id, function(err, data){
                response = {"error" : false,"message" : data};
                res.json(response);
                })
                }
        });
    });

    router.get('/:id',function(req,res){
        var response = {};
        console.log(req.params.id);
        driverModel.findById({_id:req.params.id}).exec(function(err,data){
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
        driverModel.remove({_id:req.params.id}, function(err,data){
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else{
                response = {"error" : false,"message" : "Deleted Successfully"};
            };
            res.json(response);
        });
    });

   router.get('/restaurant-drivers/:id', function(req, res, next) {
        var response={};
        driverModel.find({restaurantId: req.params.id }, null, {sort: {created_at: 1}}).exec(function(err,data){
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else{
                response = {"error" : false,"message" : data};
            };
            res.json(response);
        });
    });

router.post('/login', function(req, res, next) {
    var response={};
    if(req.body.username){
        req.body.username = req.body.username.toLowerCase();
    }
    driverModel.find({ username:req.body.username, password:req.body.password},function(err,owner) {
        console.log(owner);
        if (err) {
            res.json({error:true, data: err});
            }else{
            if(owner && owner.length > 0){
                if(owner[0].isactivated == 0){
                res.json({error: true, data: 'You did not active your account yet by sent email.'})   
                } else if(owner[0].isactivated == 1){
                res.json({error: true, data: 'Admin Approval Pending. Please contact to adminstrator.'})   
                }else if(owner[0].isactivated == 2){
                 res.json({error:false, data: owner[0]});
                }
                }
            else{
                res.json({error:true, data: 'No Driver with provided credentials.'});
            }
        };
    });
});

router.post('/forget-password',function(req,res,next){
    var response={};
    driverModel.find({email:req.body.email},function(err,data){
        if (err) {
            req.json({'error': true, 'message':err});
        } else{
            if (data.length>0) {
                emails.driverForgetEmailShoot(data[0].email, data[0].username, data[0]._id);
                res.json({'error':false,'message':'Email Sent Successfully. Please access your Email ID.'});
                }else{
                res.json({'error':true,'message':'Email does not exist'});
            }
        };
    }); 
});

router.put('/change-password/:id',function(req, res){
    var response={};
    driverModel.findById(req.params.id,function(err,data){
        if (data.password == req.body.oldpassword) {
            var newObject = {};
            newObject.password = req.body.newpassword;
            driverModel.findByIdAndUpdate(req.params.id, newObject, function(err, kitchen) {
                if(err) {
                    response = {"error" : true,"message" : 'Could not update now. Please Try Later!'};
                } else {
                    response = {"error" : false,"message" : "Password changed Successfully "};
                }
                res.json(response);
            });
        }else{
            response = {"error" : true,"message" : "Password Incorect"};
            res.json(response);
        };
    });
});

 

module.exports = router;