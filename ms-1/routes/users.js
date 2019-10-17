var express = require('express');
var router = express.Router();
var ownerModel  =  require("../model/Owner.js");
var kitchenModel  =  require("../model/Kitchen.js");
var partnerModel  =  require("../model/Partner.js");
var emails = require('../mail/emailConfig.js');
var passport = require('passport');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.get('/', function(req, res, next) {
	
  // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

	var response={};
	ownerModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/',function(req, res){

	console.log(req.body);
    password = req.body.password;
    console.log(password);
   ownerModel.register(new ownerModel(req.body), 
   password, (err, ownerData) => {
           if(err) {
               response = {"error": true, "message": err};
               res.json(response)
   } else {
        	//console.log(ownerData);
            var resObj = {}; 
            resObj.ownerId = ownerData._id;
            resObj.city = req.body.city || '';
            resObj.country = req.body.country || '';
            resObj.restaurantname = req.body.restaurantname || '';
            resObj.zipcode = req.body.zipcode || '';
            resObj.address = req.body.address || '';

            //resObj = req.body;
          //  console.log("resObj");
          //  console.log(resObj);
          passport.authenticate('local')(req, res, () => {
            restaurant = new kitchenModel(resObj);
            restaurant.save();
            emails.emailShoot(ownerData.email,ownerData.username,ownerData._id);
            response = {"error" : false,"message" : restaurant};
            res.json(response);
        });
            /*var name = ownerData.username+" <"+ownerData.email+" >";            
            var content = "Email Activation Link <a href='http://mealdaay.com:3004/owner/mailactivate/"+ownerData._id+"'>Click Here</a>"
            req.mail.sendMail({  //email options
               from: "Restaurant Team <navaidkitchen@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
               to: name, // receiver
               subject: "Email Activation", // subject
               html: content
            }, function(error, response){  //callback
               if(error){
                   console.log(error);
               }else{
                   console.log("Message sent: " + response.message);
               }
               req.mail.close();
               //res.json({status:true});
                response = {"error" : false,"message" : restaurant};
            	res.json(response);
        	});*/

        }
       
    });
});

router.post('/add-admin',function(req, res){

	console.log(req.body);
    password = req.body.password;
    console.log(password);
   ownerModel.register(new ownerModel(req.body), 
   password, (err, ownerData) => {
           if(err) {
               response = {"error": true, "message": err};
               res.json(response)
   }else {
        	console.log(ownerData);
            var resObj = {}; 
            resObj.ownerId = ownerData._id;
            resObj.city = req.body.city || '';
            resObj.country = req.body.country || '';
            resObj.restaurantname = req.body.restaurantname || '';
            resObj.zipcode = req.body.zipcode || '';
            resObj.address = req.body.address || '';
            passport.authenticate('local')(req, res, () => {
            restaurant = new kitchenModel(resObj);
            restaurant.save();
            emails.emailShoot(ownerData.email,ownerData.username,ownerData._id);
            response = {"error" : false,"message" : restaurant};
            res.json(response);
        });
            /*var name = ownerData.username+" <"+ownerData.email+" >";
            var content = "Email Activation Link <a href='http://mealdaay.com:3004/owner/resetpassword/"+ownerData._id+"'>Click Here</a>"
            req.mail.sendMail({  //email options
               from: "Restaurant Team <navaidkitchen@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
               to: name, // receiver
               subject: "Email Activation", // subject
               html: content
            }, function(error, response){  //callback
               if(error){
                   console.log(error);
               }else{
                   console.log("Message sent: " + response.message);
               }
               req.mail.close();*/
               //res.json({status:true});
        	/*});*/
        }
       
    });
});


router.post('/account-confirms',function(req, res){
    console.log(req.body);
    Customer.findOne({email:req.body.email}, function(err, dataq) {
        console.log(dataq);
        if(err) {
            response = {"error" : true,"message" : err};
        } else {            
            var loggedUser = dataq;
            var name = loggedUser.firstname+" <"+loggedUser.email+" >";            
            var content = "Email Activation Link <a href='https://mealdaay.com:3005/customer/mailactivate/"+loggedUser._id+"'>Click Here</a>"
            req.mail.sendMail({  //email options
               from: "Restaurant Team <no_reply@mealdaay.com>", // sender address.  Must be the same as authenticated user if using GMail.
               to: name, // receiver
               subject: "Email Activation", // subject
               html: content
            }, function(error, response){  //callback
               if(error){
                   console.log(error);
               }else{
                   console.log("Message sent: " + response.message);
               }
               req.mail.close();
               res.json({status:true});
               
            });

        }
    });
});



router.post('/partner',function(req, res){
	console.log(req.body);  
  partnerModel.find({  $and: [{ $or: [ { email:req.body.email }, { username: req.body.username } ] }, { OwnerId: req.body.OwnerId }] }, function(err, emailmatch){
 if(err){
     response = {"error" : true,"message" : "Something went wrong occured Error!"};
     res.json(response);
    }else{
      console.log("emailmatch.lengt");
      console.log(emailmatch.length);
      if(emailmatch.length > 0){
        response = {"error" : true,"message" : "Username Or Email Id already exist"};  
        res.json(response);     
      }else{
        var partner = new partnerModel(req.body);
        partner.save(function(err,data){
          if(err) {
              response = {"error" : true,"message" : err};            
          } else {

            emails.partneremailShoot(data.email, data.username, data._id);
            response = {"error" : false,"message" : data};
            res.json(response);
              /*var name = data.username+" <"+data.email+" >";            
              var content = "Email Activation Link <a href='http://mealdaay.com:3004/owner/partner-mailactivate/"+data._id+"'>Click Here</a>"
              req.mail.sendMail({  //email options
                 from: "Restaurant Team <navaidkitchen@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
                 to: name, // receiver
                 subject: "Partner Email Activation", // subject
                 html: content
              }, function(error, response){  //callback
                 if(error){
                     console.log(error);
                 }else{
                     console.log("Message sent: " + response.message);
                 }
                 req.mail.close();
                 //res.json({status:true});
            
            });*/
          }
        });
      }
    }
  });
	
});



router.get('/partner/:id', function(req, res, next) {
  // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
  var response={};
  partnerModel.find({OwnerId : req.params.id}, null, {sort: {created_at: 1}},function(err,data){
    if (err) {
      response = {"error" : true,"message" : "Error fetching data"};
    } else{
      response = {"error" : false,"message" : data};
    };
    res.json(response);
  }); 
});

router.get('/partner-detail/:id', function(req, res, next) {
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	partnerModel.findById(req.params.id ,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});



router.delete('/partner/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	partnerModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);		
	});	
});



router.put('/partner/:id',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	partnerModel.findByIdAndUpdate(req.params.id, req.body, function(err, partner) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
		        	response = {"error" : false,"message" : partner};	
		        	res.json(response);
		        }	
	        //res.json(response);
        });
});


router.put('/:id',function(req, res){   
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	ownerModel.findByIdAndUpdate(req.params.id, req.body, function(err, owner) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	        	    console.log(owner);
		        	kitchenModel.find({ownerId : req.params.id}).populate('ownerId').exec(function(err,data){
		            
		            console.log("owner");
		            console.log(data);

		        	response = {"error" : false,"message" : data[0]};	
		        	res.json(response);
		        	});
		        }	
	        //res.json(response);
        });
});


router.put('/disable-all/:id',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	kitchenModel.findByIdAndUpdate(req.params.id, {'activestatus':req.body.status}, function(err, kitchen) {
    ownerModel.findByIdAndUpdate(kitchen.ownerId, {'status':req.body.status}, function(err, owner) {
      console.log(owner)
			partnerModel.update({OwnerId:owner._id}, {'status':req.body.status}, function(err, partner) {
				response = {"error" : false,"message" : 'updateed'};	
		       	res.json(response);
			});
		});
	});
});


router.get('/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
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
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	ownerModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			kitchenModel.remove({ownerId : req.params.id},function(err,dataa){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	    });				
		};		
	});	
});


router.post('/getrestaurantsdetail',function(req,res){
  var response={};  
  console.log(req.body.rids);
  if(req.body.rids.length > 0){
  kitchenModel.find({ "_id" : { "$in" : req.body.rids } } , (err, data) => {     
    if (err) {
      response = {"error" : true,"message" : "Error fetching data"};
    } else{
      response = {"error" : false,"message" : data};
    };
    res.json(response);
  });
  }else{
    response = {"error" : true,"message" : "Check array"};
    res.json(response);
  }
});


module.exports = router;
