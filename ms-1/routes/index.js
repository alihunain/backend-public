var express = require('express');
var router = express.Router();
var NodeGeocoder = require('node-geocoder');
var kitchenModel  =  require("../model/Kitchen.js");
var referralModel  =  require("../model/referral.js");
var subscriptionModel  =  require("../model/subscription.js");
var ownerModel  =  require("../model/Owner.js");
var partnerModel  =  require("../model/Partner.js");
var passport = require('passport');
var emails = require('../mail/emailConfig.js');
var authenticate = require('../auth');
var path = require('path')
var fcm = require('fcm-notification');
var options = {
  	provider: 'google',
  	httpAdapter: 'https', // Default 
  	apiKey: null, // for Mapquest, OpenCage, Google Premier 
  	formatter: null         // 'gpx', 'string', ... 
};
var appDir  = path.resolve(__dirname);appDir = appDir + "/../"
var geocoder = NodeGeocoder(options);
// FCM Notification Api
router.get('/test',(req,res)=>{
	console.log(appDir);
	
	res.send(appDir);
}
)
var FCM = new fcm(appDir + "orderapp-e993a-firebase-adminsdk-5noct-c58394007a.json");

router.post('/notifications',(req,res)=>{
	let userid = req.body.userid;
	let chefid = req.body.chefid;
	let driverid = req.body.driverid;
	let type = req.body.type;
	let orderId = req.body.orderId;
	let expire = new Array();
	let jsonPath = "ownerAdminKey";
	let response = {
	   drivertoken:[],
	   usertoken:[],
	   ownertoken:[]			
	}
	if(type == "user"){
		let title = "New Order";
		let message = "You Recieved A New Order "+ orderId.substr(18,6) ;
	
		NotificationTemplate(req.body.tokens,title,message,jsonPath,expire,chefid,orderId).then((expire)=>{
			response.ownertoken = expire;
			res.json({status:false,message:response});
		})
	}else if(type == "chef"){
		if(req.body.status =="accepted"){
		let title = "New Order";
		let message = "You Recieved A New Order " + orderId.substr(18,6) + " To Deliver";
	
		console.log("worked");
		NotificationTemplate(req.body.tokensdriver,title,message,jsonPath,expire,driverid,orderId).then((expire)=>{
			response.drivertoken = expire;
			console.log("worked2");
			let title = "Order Update";
			let message = "Your Order Has Been Accepted By Resturant " + orderId.substr(18,6);
	       
			NotificationTemplate(req.body.tokencustomer,title,message,jsonPath,expire,userid,orderId).then((expire)=>{
				response.usertoken = expire;
				res.json({status:false,message:response});
			})
		})
	}else if(req.body.status =="rejected"){
		let title = "Order Update";
			let message = "Your Order Has Been Rejected By Resturant " + orderId.substr(18,6);
			NotificationTemplate(req.body.tokens,title,message,jsonPath,expire,userid,orderId).then((expire)=>{
				response.usertoken = expire;
				res.json({status:false,message:response});
			})
	}
}else if(type == "driver"){
	if(req.body.status =="accepted"){
	let title = "Order Update";
	let message = "Your order will be delivered as scheduled by you. " + orderId.substr(18,6);
   
	NotificationTemplate(req.body.tokenscustomer,title,message,jsonPath,expire,userid,orderId).then((expire)=>{
		response.usertoken = expire;
	let title = "Order Update";
	let message = "Driver Accepted The Order " + orderId.substr(18,6);
	NotificationTemplate(req.body.tokenschef,title,message,jsonPath,expire,chefid,orderId).then((expire)=>{
		response.ownertoken = expire;
		res.json({status:false,message:response});
	 })
	})

   }else if(req.body.status =="ontheway"){
	let title = "Order Update";
	let message = "Driver is on the way " + orderId.substr(18,6);

	NotificationTemplate(req.body.tokenscustomer,title,message,jsonPath,expire,userid,orderId).then((expire)=>{
		response.usertoken = expire;
	let title = "Order Update";
	let message = "Driver is on the way " + orderId.substr(18,6);
	NotificationTemplate(req.body.tokenschef,title,message,jsonPath,expire,chefid,orderId).then((expire)=>{
		response.ownertoken = expire;
		res.json({status:false,message:response});
	 })
	})

   }else if(req.body.status =="delivered"){
	let title = "Order Update";
	let message = "You Order has been delivered " + orderId.substr(18,6);

	NotificationTemplate(req.body.tokenscustomer,title,message,jsonPath,expire,userid,orderId).then((expire)=>{
		response.usertoken = expire;
	let title = "Order Update";
	let message = "Order has been delivered " + orderId.substr(18,6);
	NotificationTemplate(req.body.tokenschef,title,message,jsonPath,expire,chefid,orderId).then((expire)=>{
		response.ownertoken = expire;
		res.json({status:false,message:response});
	 })
	})

   }
}
})

function NotificationTemplate (tokens,title,content,securepath,expire,id,orderId){
	return new Promise((resolve,reject)=>{
		if(tokens.length==0){
			resolve([]);
		}
		console.log(id.constructor === Array)
		if(!(id.constructor === Array)){
			var message = {
				notification:{
					title : title,
					body : content,
				},data: {    //This is only optional, you can send any data
					_id:id,
					message:content,
					orderId:orderId,
				},
				
     android:{
       notification:{
		 "click_action":"FCM_PLUGIN_ACTIVITY",
		 "sound":"default"
       }
	 },apns: {
					payload: {
					  aps: {
						"click_action":"FCM_PLUGIN_ACTIVITY",
						"sound":"default"
					  },
					},
				  },
			   
			
			};
		}else{
		var message = {
			notification:{
				title : title,
				body : content,
				
			
			},data: {    //This is only optional, you can send any data
		
				message:content,
				orderId:orderId,
				// "click_action":"FCM_PLUGIN_ACTIVITY",
			},
			android:{
				notification:{
				  "click_action":"FCM_PLUGIN_ACTIVITY"
				}
			  }, ios: {
				alert: true,
				badge: true,
				sound: true,
				clearBadge: true
			}
		};
		
	}
		FCM.sendToMultipleToken(message,tokens, function(err, response) {
			console.log(response);
			if(err){
				   console.log('error');
			}else {
				let Result = new Array();
				for(let i =0; i < response.length;i++){
					if(response[i].response.includes("Successfully")){
						Result.push(response[i].token);
					}
					if(i+1 == response.length){
						console.log(Result);
						resolve(Result);
					}
				}
			
		
			}
			
		})
		
	})
}


/* GET home kitchen. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/date',function (req,res,next){
	res.json({error:true,message:new Date()});
});
router.post('/login', function(req, res, next) {
	req.body.username = req.body.username.toLowerCase();
	req.body.email = req.body.username.toLowerCase();
	console.log(req.body);
	ownerModel.find({ username: req.body.username.toLowerCase()},(err,ownerModel)=> {
	
		if (err) {
			res.json({error:true, data: err});
		}else{

			if(ownerModel && ownerModel.length > 0){
				
				passport.authenticate('local', (err, user, info) => {
					console.log(user);
					if (err) { return next(err); }
					
                    if (user) {
						kitchenModel.find({ownerId: user._id}).populate('ownerId').exec(function(err, data){
							console.log("this")
							console.log("this")
							console.log("this")
							console.log("this")
							console.log("this")
							console.log(data);
							if(err){
								res.json({status:false, data: 'error', type:'owner'});
							}
							if(user.status){

								authenticate.GetLoginData(user,data[0]).then(function (token) {
									console.log("login sucessfully")
									console.log(data[0]);
									res.json({status:true, data: data[0], token:token.token,type:'owner'});
                                    // res.json({error: false, status:true,data: data[0],token:token.token,type:'owner',message:"Successfully  login"});
                                  }).catch(err => {
                                    res.json({error: true, data: null,message:"There was an error logging in"});
                                  });



							}else{
								res.json({status:true, data: data[0], type:'owner','notapprove': true});
							}
						});
                    } else {
                      return res.status(401).send({ error: 'There was an error logging in' });
                    }
                  })(req, res, next);
			}else{ 
				partnerModel.find({username:req.body.username,password:req.body.password},function(err,partner) {
					if(err){
						res.json({status:false, data: 'error', type:'partner'});
					}
					if (partner.length>0) {
						var partnerinfo = partner[0];
						kitchenModel.find({ownerId: partnerinfo.OwnerId}).populate('ownerId').exec(function(err, data){
							data[0].ownerId.username = partner[0]["username"];
							if(partner[0].status){
								res.json({status:true,data: data[0],type:'partner'});
							}else{
								res.json({status:true,data: data[0],type:'partner', 'notapprove': true});
							}
						});
					}else{
						res.json({status:false, data:'',message:'no owner found '});
					}
				});
			}
		}
	}
)});
router.post('/kitchentax',(req,res)=>{
	console.log(req.body);
console.log(req.body.tax);
	
	kitchenModel.updateMany({},req.body,(err,write)=>{
		if(err){
			res.json({error:true,message:err});
		}else{
			res.json({error:false,message:'OK'});
		}
	})

})
router.post('/owner/forget-password',function(req,res,next){
    var response={};
    ownerModel.find({email:req.body.email},function(err,data){
        if (err) {
            req.flash('error', 'something went wrong!');
            
        } else{
        	console.log(data);
            if (data.length>0) {
                emails.forgetEmailShoot(data[0],'owner');
                res.json({error:false,message:'send email'});
                /*var name = data[0].firstname+" <"+data[0].email+" >";
                var content = "Password reset Link <a href='http://mealdaay.com:3004/owner/resetpassword/"+data[0]._id+"'>Click Here</a>"
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
                   res.json({error:false});
                });
                console.log(data);*/

            }else{
            	res.json({error:true,message:'Email Does Not Exist'});
            }
        };
    }); 
});

router.get('/kitchen', function(req, res, next) {

	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

	var response={};
	kitchenModel.find({}).populate('ownerId').exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/kitchenb', function(req, res, next) {
	
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

   var datac = {};
   datac.activestatus = true;
   if((req.body.city != '') && (typeof req.body.city != 'undefined') ){
     datac.city = req.body.city;
    }

    console.log(req.body.city);
	var response={};
	kitchenModel.find(datac, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/owner',function(req, res){
 
 // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

console.log(req.body);
 var response = {};
 let username = req.body.username;
 req.body.username = req.body.email.toLowerCase();
 password = req.body.password;

 console.log(password);
 ownerModel.register(new ownerModel(req.body), 
 req.body.password, (err, user) => {

		 if(err) {
			 response = {"error": true, "message": err};
			 res.json(response)
 }
	 else {
		 passport.authenticate('local')(req, res, () => {
			
			var kitchen = new kitchenModel({ownerId:user._id});
			kitchen.save(function(err,data){
				console.log("hit");
			    console.log(data,"data")
				emails.emailShoot(req.body.email,username,user._id);
				response = {"error": false, "message": "Owner Added Successfully"};
				res.json(response)
			});
					
			
	
  });
  }
});






	// var response={};
    // var owner = new ownerModel(req.body);
    // owner.save(function(err){
    // 	if(err) {
    //         response = {"error" : true,"message" : err};
    //     } else {
    //         response = {"error" : false,"message" : "Owner Added Successfully"};
    //     }
    //     res.json(response);
    // });
});

router.post('/kitchen',function(req, res){
 
 // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
 
	var response={};
	var fullAddress = req.body.address+" "+req.body.zipcode+" "+req.body.city+" "+req.body.country;
	console.log(fullAddress);
	geocoder.geocode(fullAddress, function(err, gResponse) {
		console.log(gResponse);
		    req.body.lat = gResponse[0].latitude;
		  	req.body.lng = gResponse[0].longitude;
	    var kitchen = new kitchenModel(req.body);
	    kitchen.save(function(err){
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data added"};
	        }
	        res.json(response);
	    });
	});
});

router.put('/owner/:id',function(req, res){
	console.log("Here");
 // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

	var response={};
	req.body.status = true;
console.log(req.body);
console.log(req.params.id);

	ownerModel.findByIdAndUpdate(req.params.id, req.body, function(err, kitchen) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
console.log(kitchen);
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});
router.put('/owner/changepassword/:id',function(req,res){
ownerModel.findById(req.params.id,(err,ownerModel)=>{
if(err){
	response = {"error" : true,"message" : err};
	res.json(response);
}else{
	if(!ownerModel){
		response = {"error" : false,"message" : "Data Update"};
                res.json(response);
	}else{
		ownerModel.setPassword(req.body.password, function(){
			ownerModel.save();
			
			response = {"error" : false,"message" : "Data Update"};
			res.json(response);
		});
	}
}
});
});
router.put('/change-password/:id',function(req, res){
	var response={};

	ownerModel.findById(req.params.id,(err,ownerModel)=> {
		if (err) {
			res.json({error:true, data: err});
			}else{
			if(ownerModel){
				ownerModel.setPassword(req.body.password, function(){
					ownerModel.password = req.body.password;
					ownerModel.save();
					kitchenModel.find({ownerId : req.params.id}).populate('ownerId').exec(function(err,data){
						response = {"error" : false,"message" : data[0]};	
						res.json(response);
					});
				});
			}else{
            res.json({error:true, data: 'No Customer with provided credentials.'});
        }
		}
	})
});

router.put('/kitchen/:id',function(req, res){
    var response={}; 
    if(typeof req.body.lat != 'undefined') {
         req.body.loc = [req.body.lat, req.body.lng];
    }        
    if(req.body.city && req.body.country){
       req.body.city = req.body.city.toLowerCase();
       req.body.country = req.body.country.toLowerCase();
    }
console.log(req.body.DeliveryCharges,"deliverychages found");
	kitchenModel.findByIdAndUpdate({_id : req.params.id}, req.body, function(err, kitchen) {
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});

router.get('/kitchen/:id',function(req,res){

	var response={};
    var active = {};

    active._id = req.params.id;
    active.activestatus = true;

	kitchenModel.findById(active,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/kitchen-by-owner-id/:id',function(req,res){

	var response={};

	kitchenModel.find({ownerId : req.params.id}).populate('ownerId').exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/kitchen/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	kitchenModel.remove({_id: req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

router.post('/kitchenfilters',function(req,res){
    var conditions = {}; 
    var conditions2 = {};
    conditions.activestatus = true;
    if((req.body.city != '') && (typeof req.body.city != 'undefined')){
    	conditions.city = req.body.city.toLowerCase();
    }

    if((req.body.country != '') && (typeof req.body.country != 'undefined')){
    	conditions.country = req.body.country.toLowerCase();
    }
            
    if((req.body.sortby != '') && (typeof req.body.sortby != 'undefined') && (req.body.sortby != 'rating')){
		var newsort = req.body.sortby;
		var newsorttype = ((newsort == 'created_at' || newsort == 'mindeliveryime') ? -1 : 1);
		conditions2[newsort] = newsorttype;
	}

    if(typeof req.body.cousine != 'undefined' && req.body.cousine.length > 0){
    	conditions.cuisines = {$in: req.body.cousine};     
    }

    if(req.body.range > 0 && req.body.lat != 0 && req.body.lng != 0){       
		conditions.loc = {
			$near: [req.body.lat, req.body.lng],
			$maxDistance: req.body.range/111.12
		}
	}

	var response={};
	kitchenModel.find(conditions).sort(conditions2).exec(function(err, locations) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : locations};
		}
		res.json(response);
    });
});

router.post('/filterKitchen',function(req,res){
 
    var conditions = {};
    conditions.activestatus = true;

    var lastMonth = new Date();
    lastMonth.setDate(lastMonth.getMonth());

    if(typeof req.body.country != 'undefined' && req.body.country != ''){
    	conditions.country = req.body.country;
    }
    if(typeof req.body.city != 'undefined' && req.body.city != ''){
        conditions.city = req.body.city;
    }
    if(typeof req.body.cuisines != 'undefined' && req.body.cuisines.length > 0){
       conditions.cuisines = {$in: req.body.cuisines};
    }
    if(typeof req.body.restaurant != 'undefined'){
    	if(req.body.restaurant == 'new'){
    		conditions.created_at = {'$gte':lastMonth};
    	}

    	if(req.body.restaurant == 'fastDelivery'){
    		conditions.fastestdelivery = true;
    	}
    }

    if(req.body.range > 0 && req.body.lat != 0 && req.body.lng != 0){
    	conditions.loc = {
    		$near: [req.body.lat, req.body.lng],
    		$maxDistance: req.body.range/111.12
    	}
    }

    var response={};
    kitchenModel.find(conditions).exec(function(err, locations) {
    	if (err) {
    		response = {"error" : true,"message" : "Error fetching data"};
    	} else{
    		response = {"error" : false,"message" : locations};
    	}
    	res.json(response);
    });
});


/*-------------------------------Start referral--------------------------------------------------------*/

router.post('/ownerreferral',function(req,res,next) {
    var response={};
    
    referralModel.find({emailto : req.body.emailto, referralfrom : req.body.referralfrom}, function(err, data) {
	    if(err){
			res.status(403).json({"error" : true,"message" : err});
	    }else if(data.length > 0){
			res.status(200).json({"error" : true,"message" : 'Email Already exist'});
	    }else{
	    	ownerModel.find({email:req.body.emailto},function (err,data2) {
		    	if(err){
					res.status(403).json({ "error" : true,"message" : err});
		    	}else if(data2.length > 0){
		    		res.status(200).json({"error" : true,"message" : 'Already Owner of any restaurant'});
		    	}else{
		    		partnerModel.find({email:req.body.emailto},function (err,data3) {
						if(err){
							res.status(403).json({ "error" : true,"message" : err});		
						}else if(data3.length>0){
							res.status(200).json({"error" : true,"message" : 'Already Partner of any restaurant'});
						}else{
							var referral = new referralModel(req.body);
							referral.save(function(err, sdata){
								if(err) {
									res.status(403).json({ "error" : true,"message" : err});	
								} else{
									emails.referalShoot(req.body.emailto, sdata._id);
									res.status(200).json({ "error" : false,"message" : "Refferral has been Send Sucessfully!"});
								}
							});
						}
					});
		    	}
		    });
	    }
	});
});

router.get('/ownerreferral/:id',function(req,res){
	var response={};	
	referralModel.findById(req.params.id , function (err, data) {
		console.log(data);
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	

});

router.get('/all-referral',function(req,res){
	var response={};	
	referralModel.find({} , function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	

});

router.get('/ownerreferral-ownerlist/:id',function(req,res){
	var response={};	
	referralModel.find({"referralfrom":req.params.id}).populate('referralfrom').exec((err, data)=>{
		console.log(data);
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.put('/ownerreferral/:id',function(req, res){
	var response={};
	referralModel.findByIdAndUpdate(req.params.id, req.body, function(err, kitchen) {
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});


router.delete('/ownerreferral/:id',function(req, res){
	var response={};
	referralModel.remove({_id: req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});
});


router.post('/kitchenfiltersstr',function(req,res){
	var response={};	
	kitchenModel.find({restaurantname:{ $regex: new RegExp(req.body.str, "ig") }, activestatus : true} , function (err, data) {			
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});
});


router.get("/heatmaplatlng", (req, res) => {
	kitchenModel.find({}, 'lat lng', (err, data)=> {
	if(err){
		res.json({"error" : true,"message" : err});
		} else {
		res.json({"error" : false,"message" : data});
	}
	});
});

/*-------------------------------END referral--------------------------------------------------------*/


/*-------------------------------Start Email for successfully-----------------------------------------------------------*/

router.post('/order-email-accepted',function(req,res,next){
	var response={};
	// console.log(req.body.order);
    kitchenModel.find({ _id : req.body.order.restaurantid  }).populate('ownerId').exec(function(err,data){
        if (err) {
            res.json({error: true, message: err});          
        } else{  
				//console.log("eml", data); 
				console.log(data.length);     	
            if (data.length>0) {
            	
            	emails.OrderAcceptedByKitchen(req.body.customeremail,req.body.customeremail,req.body.order);
                res.json({error: false, message: 'Email send successfully.'});
                }else{
                res.json({error: true, message: 'It did not find any restaurant.'});
            } 
        };
        }); 
	});

	router.post('/order-email-driveraccepted',function(req,res,next){
		var response={};
		console.log(req.body.order);
		kitchenModel.find({ _id : req.body.order.restaurantid  }).populate('ownerId').exec(function(err,data){
			if (err) {
				res.json({error: true, message: err});          
			} else{  
					//console.log("eml", data);      	
				if (data.length>0) {
				
					
					emails.OrderAcceptedByDriver(req.body.customeremail,req.body.customeremail,req.body.order);
					res.json({error: false, message: 'Email send successfully.'});
					}else{
					res.json({error: true, message: 'It did not find any restaurant.'});
				} 
			};
			}); 
		});
		router.post('/order-email-driveronway',function(req,res,next){
			var response={};
			console.log(req.body.order);
			kitchenModel.find({ _id : req.body.order.restaurantid  }).populate('ownerId').exec(function(err,data){
				if (err) {
					res.json({error: true, message: err});          
				} else{  
						//console.log("eml", data);      	
					if (data.length>0) {
						
						emails.OrderDriverOnWay(req.body.customeremail,req.body.customeremail,req.body.order);
						res.json({error: false, message: 'Email send successfully.'});
						}else{
						res.json({error: true, message: 'It did not find any restaurant.'});
					} 
				};
				}); 
			});
			router.post('/order-email-delivered',function(req,res,next){
				var response={};
				console.log(req.body.order);
				kitchenModel.find({ _id : req.body.order.restaurantid  }).populate('ownerId').exec(function(err,data){
					if (err) {
						res.json({error: true, message: err});          
					} else{  
							//console.log("eml", data);      	
						if (data.length>0) {
							
							emails.OrderDelivered(req.body.customeremail,req.body.customeremail,req.body.order);
							res.json({error: false, message: 'Email send successfully.'});
							}else{
							res.json({error: true, message: 'It did not find any restaurant.'});
						} 
					};
					}); 
				});
	
	
router.post('/order-email-driveraccept',function(req,res,next){
	var response={};
	console.log(req.body.order);
    kitchenModel.find({ _id : req.body.restaurantid  }).populate('ownerId').exec(function(err,data){
        if (err) {
            res.json({error: true, message: err});          
        } else{  
                //console.log("eml", data);      	
            if (data.length>0) {
            	
            	emails.OrderAcceptedByDriver(req.body.customeremail,req.body.customeremail,req.body.order);
                res.json({error: false, message: 'Email send successfully.'});
                }else{
                res.json({error: true, message: 'It did not find any restaurant.'});
            } 
        };
        }); 
    });
	router.post('/order-email-driveronway',function(req,res,next){
		var response={};
		console.log(req.body.order);
		kitchenModel.find({ _id : req.body.restaurantid  }).populate('ownerId').exec(function(err,data){
			if (err) {
				res.json({error: true, message: err});          
			} else{  
					//console.log("eml", data);      	
				if (data.length>0) {
					
					emails.OrderDriverOnWay(req.body.customeremail,req.body.customeremail,req.body.order);
					res.json({error: false, message: 'Email send successfully.'});
					}else{
					res.json({error: true, message: 'It did not find any restaurant.'});
				} 
			};
			}); 
		});
		router.post('/order-email-driverdeliver',function(req,res,next){
			var response={};
			console.log(req.body.order);
			kitchenModel.find({ _id : req.body.restaurantid  }).populate('ownerId').exec(function(err,data){
				if (err) {
					res.json({error: true, message: err});          
				} else{  
						//console.log("eml", data);      	
					if (data.length>0) {
						
						emails.OrderDelivered(req.body.customeremail,req.body.customeremail,req.body.order);
						res.json({error: false, message: 'Email send successfully.'});
						}else{
						res.json({error: true, message: 'It did not find any restaurant.'});
					} 
				};
				}); 
			});

router.post('/order-email',function(req,res,next){
	var response={};
	// console.log(req.body.order);
    kitchenModel.find({ _id : req.body.restaurantid  }).populate('ownerId').exec(function(err,data){
        if (err) {
            res.json({error: true, message: err});          
        } else{  
				//console.log("eml", data);      	
				console.log(data.length);
            if (data.length>0) {
            	emails.restroOrderEmailShoot(data[0].ownerId.email,data[0].username,req.body.order);
            	emails.customerOrderEmailShoot(req.body.customeremail,req.body.customeremail,req.body.order);
                res.json({error: false, message: 'Email send successfully.'});
                }else{
                res.json({error: true, message: 'It did not find any restaurant.'});
            } 
        };
        }); 
    });



router.post('/order-cancel-email',function(req,res,next){
	if(req.body.customeremail){
       emails.customerOrderRejectedEmailShoot(req.body.customeremail, req.body.order);
	}
	if(req.body.kitchenemail){
       emails.kitchenOrderRejectedEmailShoot(req.body.kitchenemail, req.body.order);
	   }
    res.json({error: false, message: 'Customer email Sent.'})
});

/*-------------------------------End Email for successfully-----------------------------------------------------------*/


router.post('/subscriber/offer/send',async function(req,res,next){
	console.log("email going to send");
	user = {};
	user._id = "5bb1a14c8030592a0e8ad9dc"
	emailToSent = ['mabdullahkhan1996@gmail.com','omegakhan1996@gmail.com'];
	data = new Date().toISOString();
	console.log(data)
	try{
	let	mailobject =  [
        {
            "_id": "5bcdaa74bced40395459b0ab",
            "name": "offer 1",
            "kitchenId": "5bbdbb65a503e429febe588b",
            "type": "your first time Order",
            "percentorpricevalue": "30",
            "couponcode": "0812",
			"special": true,
			"expirydate":new Date().toISOString(),
            "__v": 0
        },
        {
            "_id": "5bcdaa88bced40395459b0ac",
            "name": "offer 1",
            "kitchenId": "5bbdbb65a503e429febe588b",
            "type": "on your weekly",
            "percentorpricevalue": "40",
            "couponcode": "7012",
			"special": true,
			"expirydate":new Date().toISOString(),
            "__v": 0
        },
        {
            "_id": "5bcdaa8dbced40395459b0ad",
            "name": "offer 2",
            "kitchenId": "5bbdbb65a503e429febe588b",
            "type": "year package",
            "percentorpricevalue": "10",
            "couponcode": "0012",
			"special": true,
			"expirydate": new Date().toISOString(),
            "__v": 0
        },
	]
		emailToSent = await	subscriptionModel.find({}).exec();
		console.log(emailToSent,emailToSent[1].email);
	//	for(let i  =0  ; i < emailToSent.length ; i ++){
		 emails.emailPromotionalShoot("omegakhan1996@gmail.com", mailobject);
	//	}
		console.log({"error" : true,"message" : "MAIL send"});
		res.json({"error" : true,"message" : "MAIL send"});
	} catch(err){
		console.log(err);
	}
});


router.get('/subscription-by-id/:id',function(req,res){
    var response={};
    subscriptionModel.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});


router.delete('/subscriber/:id',function(req,res){
    var response={};
    subscriptionModel.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});

router.get('/subscriber', function(req, res, next) {
    var response={};
    subscriptionModel.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});


router.post('/subscriber',function(req, res){
	var response={};
	var subscription = new subscriptionModel(req.body);
	console.log(req.body);
	
    subscription.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Subscribed!"};
        }
        res.json(response);
    });
});
router.get('/popularchief',async function(req,res){
	
	console.log(req.query.cn);
	kitchenModel.find({country:req.query.cn})
	.populate('ownerId').exec(function(err,kitchens){
		if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : kitchens};
        }
        res.json(response);
	})
});
router.post('/notify/menu',function (req,res){
	console.log('notify',req.body.mailobject);
	if(req.body.mailobject){
		emails.MenuIsSetupForFirstTimeEmailShoot('customersupport@mealdaay.com', req.body.mailobject);
	 }
	 res.json({error: false, message: 'Customer email Sent.'});

});








module.exports = router;
