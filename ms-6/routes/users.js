var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../auth');
var User = require('../model/User.js');
var ownerModel = require('../model/Owner.js');
var settingModel = require('../model/Setting.js');
var emails = require('../mail/emailConfig.js');


router.post('/register', function(req, res) {
    console.log(req.body);
    console.log("hit");
    User.register(new User(req.body), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({
                status: 'Registration successful!'
            });
        });
    });
});


router.post('/login', function(req, res, next) {
    console.log(req.body);




    passport.authenticate('local', (err, user, info) => {
        console.log("login")
        console.log(user);
        if (err) { return next(err); }
        if (user) {
                    authenticate.GetLoginData(user).then(function (token) {
                        console.log("login sucessfully!!!!")
                        res.json({status:'Login successful!', data: user, token:token.token});
                        // res.json({error: false, status:true,data: data[0],token:token.token,type:'owner',message:"Successfully  login"});
                      }).catch(err => {
                        res.json({error: true, data: null,message:"There was an error logging in"});
                      });
                }else{
                    res.json({status:true, data: user, type:'owner','notapprove': true});
                }
      })(req, res, next);






    // User.find({username:req.body.username,password:req.body.password},function(err,user) {
    //     if (user.length>0) {
    //         req.logIn(user[0], function(err) {
    //             if (err) {
    //                 return res.status(500).json({
    //                 err: 'Could not log in User'
    //                 });
    //             }

    //             //console.log(req.user);
    //             res.status(200).json({
    //                 data:req.user,
    //                 status: 'Login successful!'
    //             });
    //         });
    //     }else{
    //         res.json({status:false,data:'Bad Credential'});
    //     };
    // });
});


router.get('/logout', function(req, res) {
    //req.logout();
    req.session.destroy();
    res.status(200).json({
        status: 'Bye!'
    });
});


router.get('/status', function(req, res) {
    // console.log(req.user);
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    // if (typeof req.session.loggedInUser == 'undefined') {
    //     return res.status(200).json({
    //         status: false,
    //         data:"Access Denied"
    //     });
    // }
    res.status(200).json({
        data:req.session.loggedInUser,
        status: true
    });
});

router.put('/admin/:id',function(req, res){
    console.log(req._user);
    var response={};
    User.findByIdAndUpdate(req.params.id, req.body ,function(err, owner) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data Update"};
            }
            res.json(response);
        });
});

router.get('/admin/:id',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    User.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching datahbjvhbj"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});


router.post('/forget-password',function(req,res,next){
    var response={};
    User.find({email:req.body.email},function(err,data){
        if (err) {
            req.flash('error', 'something went wrong!');
            
        } else{
            if (data.length>0) {
               emails.forgetEmailShoot(data[0]);
               /* var name = data[0].username+" <"+data[0].email+" >";
                var content = "Password reset Link <a href='http://mealdaay.com:3004/admin/resetpassword/"+data[0]._id+"'>Click Here</a>"
                console.log(content);
                req.mail.sendMail({  //email options
                   from: "Restaurant Team <navaidkitchen@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
                   to: name, // receiver
                   subject: "Reset Password", // subject
                   //text: "Email Example with nodemailer" // body
                   html: content
                }, function(error, response){  //callback
                   if(error){
                       console.log(error);
                   }else{
                       console.log("Message sent: " + response.message);
                   }
                   req.mail.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                   
                });*/
                res.json({error:false});
                //console.log(data);
            }else{
                res.json({error:true,message:'Email Does Not Exist'});
            }
        };
    }); 
});

router.get('/', function(req, res, next) {
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    // if (typeof req.session.loggedInUser == 'undefined') {
    //     return res.status(200).json({
    //         status: false,
    //         data:"Access Denied"
    //     });
    // }
    var response={};
    ownerModel.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        console.log(response);
        res.json(response);
    }); 
});

router.get('/all-users',function(req, res, next) {
    var response={};
    User.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

router.get('/complexity',function(req, res, next) {

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


router.post('/complexity',function(req, res){
    console.log(req.body);
   
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

router.put('/complexity/:id',function(req, res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    settingModel.findByIdAndUpdate(req.params.id, req.body, function(err, owner) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data Update"};
            }
            res.json(response);
        });
});


router.post('/',function(req, res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    var owner = new ownerModel(req.body);
    owner.save(function(err){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/:id',function(req, res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    ownerModel.findByIdAndUpdate(req.params.id, req.body, function(err, owner) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data Update"};
            }
            res.json(response);
        });
});

router.get('/:id',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    ownerModel.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.delete('/:id',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    ownerModel.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});

module.exports = router;