var express = require('express');
var router = express.Router();
var Customer = require('../model/customer.js');
var emails = require('../mail/emailConfig.js');
var passport = require('passport');
var authenticate = require('../auth');

router.post('/multiple', function(req, res, next) {  
    var response={};
    Customer.find({"_id": {"$in" : req.body.ids}}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        console.log(response);
        res.json(response);
    }); 
});



/*router.post('/signup',function(req, res) {
    
    var response = {};
    req.body.username = req.body.username.toLowerCase();
    var cust = new Customer(req.body);

    cust.save(function (err, data) {
        if (err) {

            response = {"error": true, "message": err};
        } else {
            if(req.body.accounttype){
            }else{
            emails.emailShoot(req.body.email, req.body.username, data._id);
            }
            response = {"error": false, "message": "Registration successful"};
        }
        res.json(response);
    });
});
*/



router.post('/signup',function(req, res) {
    // if (typeof req.body.accounttype == 'undefined' || req.body.accounttype == null || req.body.accounttype.trim() == '') {
    //     req.body.accounttype = 'customer'
    // }
    console.log("hello");
	Customer.find({ username: req.body.username.toLowerCase()},function(err,customer) {
        if (err) {
            res.json({error:true, message: 'Error fetching data'});
        }else{
            if(customer && customer.length > 0){
                if (customer[0]['accounttype'] == 'customer') {
                    res.json({error:true, message: 'Customer already exists.'});
                }else{
                    res.json({error:false, message: customer[0]});
                }
            }else{
                var response = {};
                req.body.username = req.body.username.toLowerCase();
                password = req.body.password;
                console.log(password);
                Customer.register(new Customer(req.body), 
                password, (err, user) => {
                        if(err) {
                            response = {"error": true, "message": err};
                            res.json(response)
                }
                    else {
                        console.log("Bad");
                        if(req.body.accounttype){
                          
                        }else{
                            console.log("mail send");
                            
                          emails.emailShoot(req.body.email, req.body.username, user._id);
                        }
                        passport.authenticate('local')(req, res, () => {
                          
                            response = {"error": false, "message": "Registration successful"};
                            res.json(response)
                 });
                 }
            });

           





            	// var cust = new Customer(req.body);

            	// cust.save(function (err, data) {
            	// 	if (err) {

            	// 		response = {"error": true, "message": err};
            	// 	} else {
                //         if(req.body.accounttype){
                //         }else{
                //         emails.emailShoot(req.body.email, req.body.username, data._id);
                //         }
            	// 		response = {"error": false, "message": "Registration successful"};
            	// 	}
            	// 	res.json(response);
            	// });
            }
        };
    });
});


router.post('/login', function(req, res, next) {
        req.body.username = req.body.username.toLowerCase();
    Customer.find({ username: req.body.username.toLowerCase()},(err,customer)=> {
        if (err) {
            res.json({error:true, data: err});
            }else{
            if(customer && customer.length > 0){
                passport.authenticate('local', (err, user, info) => {
                    if (err) { return next(err); }
                    if (user) {
                        if(user.status){
                            //customerUser = Object.assign({}, user);
                            var customerUser = JSON.parse(JSON.stringify(user));
                            delete customerUser["salt"];
                            delete customerUser.hash;
                            console.log(customerUser)
                            user.new = "new";
                            Customer.update({ "_id": customer[0]._id },{"timezone": req.body.timezone}, (err, data)=>{
                                // console.log(user);
                                authenticate.GetLoginData(user).then(function (data) {
                                    res.json({error: false, data: customerUser,token:data.token,message:"Successfully  login"});
                                  }).catch(err => {
                                    res.json({error: true, data: null,message:"There was an error logging in"});
                                  });
                            });
                            }else{
                             res.json({error: true, data: 'Account not activated Yet. Please Check Your email And Activate account.'})   
                            }
                    } else {
                      return res.status(401).send({ error: 'There was an error logging in' });
                    }
                  })(req, res, next);
                
                }else{
                res.json({error:true, data: 'No Customer with provided credentials.'});
            }
        };
    });
});
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.post('/forget-password', function(req,res,next){
    var response={};
    Customer.find({email:req.body.email},function(err,data){
        if (err) {
            req.flash('error', 'something went wrong!');            
        } else{
            if (data.length>0) {
                emails.forgetEmailShoot(data[0], 'cust');
               /* var name = data[0].firstname+" <"+data[0].email+" >";
                var content = "Hi, <br> <br> Your userId <b>"+ data[0].username +"</b> Please click the below link to reset your password. <a href='http://mealdaay.com:3004/customer/reset-password/"+data[0]._id+"'>Click Here</a>"
                req.mail.sendMail({  //email options
                   from: "Restaurant Team <navaidkitchen@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
                   to: name, // receiver
                   subject: "Reset Password", // subject
                   //text: "Email Example with nodemailer" // body
                   html: content
                }, function(error, response){  //callback
                   if(error){
                       console.log(error);
                   }
                   else{
                       console.log("Message sent: " + response.message);
                   }
                   req.mail.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                   
                });*/
                // console.log(data);
                res.json({error:false});
            }else{
                res.json({error:true,message:'Email does not exist'});
            }
        };
    }); 
});

router.put('/change-password/:id',function(req, res,next){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
 Customer.findById(req.params.id,(err,customer)=> {
     console.log(err);
     console.log(customer);
     console.log(customer.email == customer.username);
    if (err) {
        res.json({error:true, data: err});
        }else{
        if(customer){
            console.log(req.body);
            console.log("in")
            req.body.password = req.body.oldpassword;
            req.body.email = customer.email;
            req.body.username = customer.email;
            console.log(req.body.password);
            passport.authenticate('local', (err, user, info) => {
              console.log(user,"user");
                if (err) { return next(err); }
                if (user) {
                    customer.setPassword(req.body.newpassword, function(){
                        customer.save();
                        res.status(200).json({message: 'password reset successful'});
                    });
                } else {
                  return res.status(401).send({ error: 'There was an error changing password' });
                }
              })(req, res, next);
            
            }else{
            res.json({error:true, data: 'No Customer with provided credentials.'});
        }
    };
});
});

router.get('/:id',function(req,res){
    var response={};
    console.log(req.params.id);
    Customer.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});
router.put('/changepassword/:id',function(req,res){
    console.log("password chagne is clled");
    Customer.findById(req.params.id, function(err, owner) {
        if(err) {
            response = {"error" : true,"message" : err};
            res.json(response);
        } else {
            if(!owner){

                response = {"error" : false,"message" : "Data Update"};
                res.json(response);
            }else{
                owner.setPassword(req.body.password, function(){
                    owner.save();
                    response = {"error" : false,"message" : "Data Update"};
                    res.json(response);
                });
        }
        }
        
    });
});
router.put('/:id',function(req, res){
    console.log(req.body,req.params.id);

    var response={};
    Customer.findByIdAndUpdate(req.params.id, req.body, function(err, owner) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data Update"};
            }
		console.log(owner);
            res.json(response);
        });
});

router.delete('/:id',function(req,res){
    var response={};
    console.log(req.params.id);
    Customer.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});

router.get('/', function(req, res, next) {
    var response={};
    Customer.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
     //   console.log(response);
        res.json(response);
    }); 
});



router.put('/referralpoint/:id',function(req, res){
    // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

    var response={};
    Customer.findByIdAndUpdate(req.params.id, req.body, function(err, customer) {
                if(err) {
                    response = {"error" : true,"message" : err};
                } else {
                    response = {"error" : false,"message" : "Points changed Successfully "};
                }
                res.json(response);
            });
    });

module.exports = router;
