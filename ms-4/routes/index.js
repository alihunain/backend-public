// var express = require('express');
// var router = express.Router();
// var orderModel  =  require("../model/Order.js");

var ConvergeLib = require('../converge.wrapper');
// // for testing elvon provieded
// //var convergeLib = new ConvergeLib('000127', 'ssltest', 'IERAOBEE5V0D6Q3Q6R51TG89XAIVGEQ3LGLKMKCKCVQBGGGAU7FN627GPA54P5HR', 'true');
// var convergeLib = new ConvergeLib('878295', 'mealwebpage', 'FJJBKYOZF2WV34E1EZCJOINKER5D6U4Q0WUIOC9KEKX5JIAM7Q4DOKOUBPPQSSQF', false);
// // var convergeLib;
// //5472063333333330 test card 
// var CoverageConfigModel  =  require("../model/CoverageConfig.js");
// var sslMerchantID = '';
// var sslUserID = '';
// var sslPin = '';

// /*var StripeConfigModel  =  require("../model/StripeConfig.js");
// var keyPublishable = '';
// var keySecret = '';
// var stripe;*/


// /*-------------------------------Start ConvergeLib--------------------------------------------------------*/
// //  async function setValues(){
// // 	console.log("ssl");
// // 	sslMerchantID = "878295";
// // 	sslUserID = "mealwebpage";
// // 	sslPin = "FJJBKYOZF2WV34E1EZCJOINKER5D6U4Q0WUIOC9KEKX5JIAM7Q4DOKOUBPPQSSQF";
// // 	convergeLib = new ConvergeLib( sslMerchantID, sslUserID, sslPin, false);
// // 	await CoverageConfigModel.find({},function(err,data){
// // 		if (err) {
// // 			console.log("error");
// // 		} else{
// // 			if(data.length == 1){
// // 				console.log("ssl");
// // 				sslMerchantID = "878295";
// // 				sslUserID = "mealwebpage";
// // 				sslPin = "FJJBKYOZF2WV34E1EZCJOINKER5D6U4Q0WUIOC9KEKX5JIAM7Q4DOKOUBPPQSSQF";
// // 				convergeLib = new ConvergeLib( sslMerchantID, sslUserID, sslPin, false);
// // 				console.log(convergeLib,'line 38');
// // 			}
// // 		}
// // 	});
// // }

// //setValues();

// router.get('/coverage-config', function(req, res, next) {
//  	var response={};
//  	CoverageConfigModel.find({},function(err,data){
// 		if (err) {
// 			res.json({error: true, message: err});
// 		} else{
// 			res.json({error: false, message: data});
// 		}
// 	});
// });

// router.post('/coverage-config-add', function(req, res, next) {
//  	var response={};
// 	CoverageConfigModel.find({},function(err,fdata){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			if(fdata.length == 1){
// 	            CoverageConfigModel.findByIdAndUpdate(fdata[0]._id, req.body, {new:true}, (err, udata)=>{
// 	            	if(err){
// 						res.json({"error" : true,"message" : err});
// 	            	}else{
// 	            		setValues();
// 	            		res.json({"error" : false,"message" : udata});
// 	            	}
// 	            });
// 			}else{
// 				var ConfigModel = new CoverageConfigModel(req.body);
// 				ConfigModel.save(function(err, sdata){
// 					if(err) {
// 						response = {"error" : true,"message" : err};
// 					} else {
// 						setValues();
// 						response = {"error" : false,"message" : sdata};
// 					}
// 					res.json(response);
// 				});			
// 			}
// 		};
// 	});	
// });

// router.post('/collect-payment', function(req, res, next) {
// 	req.body.fname = req.body.fname || 'guest';
// 	req.body.lname = req.body.lname || 'customer';
// 	convergeLib.collectPayment(req.body.fname,req.body.lname,req.body.email,req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv,req.body.amount,req.body.custid,'Payment for Mealdaay Order')
// 	.then(function(response){
// 		console.log("response");
// 		console.log(response);
// 		res.json({"error" : false,"message" : response});
// 	})
// 	.catch(function(err){
// 		console.error('error',err);
// 		res.json({"error" : true,"message" : err});
// 	});
// });

// router.post('/verify-card', function(req, res, next) {
// 	console.log(req.body);
// 	// setValues();
// 	req.body.fname = req.body.fname || 'guess';
// 	req.body.lname = req.body.lname || 'customer';
// 	req.body.email = req.body.email || 'test@gmail.com';
// 	 req.body.address = req.body.address || 'test';
// 	 req.body.zip = req.body.zip || '9999';
// 	 console.log(req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv,req.body.address,req.body.zip,req.body.fname)
// 	// req.body.first=req.body.first || 'test';
// 	// req.body.last = req.body.last || 'test';
// 	convergeLib.verifyCard(req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv,req.body.address,req.body.zip,req.body.fname,req.body.lname)
//     .then(function(response){
		
// 		if(response.txn && response.txn.errorCode){
// 		return	res.json({"error" : true,"message" : response});
// 		}else{
// 		console.log('response ',response);
// 		cardType  = response.txn.ssl_card_type;
// 		console.log(cardType);
// 		convergeLib.generateToken(req.body.fname,req.body.lname,req.body.email,req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv)
// 		.then(function(response){
// 			if(response.txn){
// 				console.log('response ',response);
// 				// response.txn.ssl_card_type  = cardType;
// 			}
// 			res.json({"error" : false,"message" : response});
// 		})
// 		.catch(function(err){
// 			console.error('error',err);
// 			res.json({"error" : true,"message" : err});
// 		});
// 	}
//     })
//     .catch(function(err){
//         console.error('error',err);
//         res.json({"error" : true,"message" : err});
//     });
// });


// router.post('/apply-generated-token', function(req, res, next) {
// 	console.log(req.body);
// 	convergeLib.collectPaymentByToken(req.body.token, req.body.amount, req.body.invoiceNumber, req.body.description)
// 	.then(function(response){
// 		console.log('response ',response);
// 		res.json({"error" : false,"message" : response});
// 	})
// 	.catch(function(err){
// 		console.error('error',err);
// 	});
// });



// router.post('/generate-card-token', function(req, res, next) {
// 	convergeLib.generateToken(req.body.fname,req.body.lname,req.body.email,req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv)
// 	.then(function(response){
// 		console.log('response ',response);
// 		res.json({"error" : false,"message" : response});
// 	})
// 	.catch(function(err){
// 		console.error('error',err);
// 		res.json({"error" : true,"message" : err});
// 	});
// });



// /*-------------------------------End ConvergeLib--------------------------------------------------------*/







// /*-------------------------------Start Stripe--------------------------------------------------------*/

// /*function setValues(){
// 	StripeConfigModel.find({},function(err,data){
// 		if (err) {
// 			console.log("error");
// 		} else{
// 			console.log("ff", data);
// 			if(data.length == 1){
// 				keyPublishable = data[0].keypublishable;
// 				keySecret = data[0].keysecret;
// 				stripe = require("stripe")(keySecret);
// 				console.log("keyAssign");
// 			}
// 		}
// 	});
// }

// setValues();


// router.get('/stripeconfig', function(req, res, next) {
//  	var response={};
//  	StripeConfigModel.find({},function(err,data){
// 		if (err) {
// 			res.json({error: true, message: err});
// 		} else{
// 			res.json({error: false, message: data});
// 		}
// 	});
// });

// router.post('/stripeconfig', function(req, res, next) {
//  	var response={};
// 	StripeConfigModel.find({},function(err,fdata){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			if(fdata.length == 1){
//             StripeConfigModel.findByIdAndUpdate(fdata[0]._id, req.body, {new:true}, (err, udata)=>{
//             	if(err){
// 					res.json({"error" : true,"message" : err});
//             	}else{
//             		setValues();
//             		res.json({"error" : false,"message" : udata});
//             	}
//             });
// 			}else{
// 				var ConfigModel = new StripeConfigModel(req.body);
// 				ConfigModel.save(function(err, sdata){
// 				if(err) {
// 				response = {"error" : true,"message" : err};
// 				} else {
// 					setValues();
// 				response = {"error" : false,"message" : sdata};
// 				}
// 				res.json(response);
// 				});			
// 			}
// 		};
// 	});	
// });*/

// /*-------------------------------END Stripe--------------------------------------------------------*/


// /*-------------------------------START Order--------------------------------------------------------*/

// router.get('/order', function(req, res, next) {
//  	var response={};
// 	orderModel.find({}, null, {sort: {created_at: -1}},function(err,data){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			response = {"error" : false,"message" : data};
// 		};
// 		res.json(response);
// 	});	
// });

// router.post('/driverorders', function(req, res, next) {
//  	var response={};
// 	orderModel.find({'restaurantid':{$in:req.body.rids}}, null, {sort: {created_at: -1}},function(err,data){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			response = {"error" : false,"message" : data};
// 		};
// 		res.json(response);
// 	});	
// });


// router.get('/customerorder/:id', function(req, res, next) {
//  	var response={};
// 	orderModel.find({customerid: req.params.id}, null, {sort: {created_at: -1}}, function(err,data){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			response = {"error" : false,"message" : data};
// 		};
// 		res.json(response);
// 	});	
//    });


// router.post('/order',function(req, res){
//  	var response={};
//     var order = new orderModel(req.body);
//     order.save(function(err, data){
//     	if(err) {
//             response = {"error" : true,"message" : err};
//         } else {
//             response = {"error" : false,"message" : data};
// 		}
// 		console.log(response);
//         res.json(response);
//     });
//    });


// router.post("/charge", (req, res) => {
// 	console.log(req.body.currency);
// 	let token = req.body.token;
// 	let amount = req.body.amount * 100;
// 	console.log("amount", amount);
// 	let currency = req.body.currency;
// 	stripe.charges.create({
// 	amount: amount,
// 	currency: currency,
// 	description: "Payment Charge for MealDaay.com.",
// 	source: token,
// 	}, function(err, charge) {    		
// 	// asynchronously called
// 	if(err){
// 	res.status(500).json(err);
// 	}else{

// 	res.status(200).json(charge);
// 	}
// 	});
// });



// router.put('/order/:id',function(req, res){
// 	var response={};
// 	console.log(req.body);
// 	orderModel.findByIdAndUpdate(req.params.id, req.body, function(err, order) {
// 	    	if(err) {
// 	            response = {"error" : true,"message" : err};
// 	        } else {
// 	            response = {"error" : false,"message" : "Data Update"};
// 	        }
// 	        res.json(response);
//         });
//        });




// router.get('/order/:id',function(req,res){
 
//  // if (!req.isAuthenticated()) {
//  //        return res.status(200).json({
//  //            status: false,
//  //            message:'Access Denied'
//  //        });
//  //    }

// 	var response={};
// 	console.log(req.params.id);
// 	orderModel.findById(req.params.id,function(err,data){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			response = {"error" : false,"message" : data};
// 		};
// 		res.json(response);
// 	});	
// });



// router.get('/orderbussiness',function(req,res){
// 	var response={};

// 	orderModel.aggregate([
//         {$match: {"status" : "completed"}},
//         {
//         $group: {
//             _id: '$restaurantid', // grouping key - group by field district                
//             bussinessamount: { $sum: '$subtotal' }
//         }
//         }
//     ]).exec((err,data) => {
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			response = {"error" : false,"message" : data};
// 		};
// 		res.json(response);
// 	});

// });


// router.delete('/order/:id',function(req,res){
 
//  // if (!req.isAuthenticated()) {
//  //        return res.status(200).json({
//  //            status: false,
//  //            message:'Access Denied'
//  //        });
//  //    }
 
// 	var response={};
// 	console.log(req.params.id);
// 	orderModel.remove({_id:req.params.id},function(err,data){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			response = {"error" : false,"message" : "Deleted Successfully"};
// 		};
// 		res.json(response);
// 	});	
// });
// /*-------------------------------END Order--------------------------------------------------------*/

// router.get('/restaurantorders/:id',function(req, res){
// var response={};
// orderModel.find({ restaurantid: req.params.id}, null, {sort: {created_at: -1}}, function(err,data){
// 	if (err) {
// 		response = {"error" : true,"message" : err};
// 	} else{
// 		response = {"error" : false,"message" : data};
// 	};
// 	res.json(response);
//   });	
// });





// module.exports = router;






var express = require('express');
var router = express.Router();
var orderModel  =  require("../model/Order.js");

var ConvergeLib = require('converge-lib');

/*var convergeLib = new ConvergeLib('008104', 'webpage', 'UT2FNY', 'false');*/

// var convergeLib;
var CoverageConfigModel  =  require("../model/CoverageConfig.js");
// var convergeLib = new ConvergeLib('000127', 'ssltest', 'IERAOBEE5V0D6Q3Q6R51TG89XAIVGEQ3LGLKMKCKCVQBGGGAU7FN627GPA54P5HR', 'true');
var convergeLib = new ConvergeLib('878295', 'mealwebpage', 'FJJBKYOZF2WV34E1EZCJOINKER5D6U4Q0WUIOC9KEKX5JIAM7Q4DOKOUBPPQSSQF', false);
var sslMerchantID = '';
var sslUserID = '';
var sslPin = '';

/*var StripeConfigModel  =  require("../model/StripeConfig.js");
var keyPublishable = '';
var keySecret = '';
var stripe;*/


/*-------------------------------Start ConvergeLib--------------------------------------------------------*/
function setValues(){
	CoverageConfigModel.find({},function(err,data){
		if (err) {
			console.log("error");
		} else{
			if(data.length == 1){
				sslMerchantID = data[0].ssl_merchant_id;
				sslUserID = data[0].ssl_user_id;
				sslPin = data[0].ssl_pin;
				convergeLib = new ConvergeLib( sslMerchantID, sslUserID, sslPin, false);
			}
		}
	});
}

//  setValues();
router.post('/collectpaymentbytoken',function(req,res,next){

	convergeLib.collectPaymentByToken(req.body.token, req.body.amount, req.body.custid, 'Payment for Mealdaay Order')
	.then(function(response){
		res.json({"error" : false,"message" : response});
   })
   .catch(function(err){
	   console.error('error',err);
   });
});
router.post('/generate-card-token', function(req, res, next) {
	req.body.address = req.body.address || 'test';
	req.body.zip  = req.body.zip || '999';
	console.log(req.body.fname,req.body.lname,req.body.email,req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv,req.body.address,req.body.zip);
	convergeLib.generateToken(req.body.fname,req.body.lname,req.body.email,req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv,req.body.address,req.body.zip)
	.then(function(response){
		console.log('response ',response);
		res.json({"error" : false,"message" : response});
	})
	.catch(function(err){
		console.error('error',err);
		res.json({"error" : true,"message" : err});
	});
});

router.get('/coverage-config', function(req, res, next) {
 	var response={};
 	CoverageConfigModel.find({},function(err,data){
		if (err) {
			res.json({error: true, message: err});
		} else{
			res.json({error: false, message: data});
		}
	});
});

router.post('/coverage-config-add', function(req, res, next) {
 	var response={};
	CoverageConfigModel.find({},function(err,fdata){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			if(fdata.length == 1){
	            CoverageConfigModel.findByIdAndUpdate(fdata[0]._id, req.body, {new:true}, (err, udata)=>{
	            	if(err){
						res.json({"error" : true,"message" : err});
	            	}else{
	            		setValues();
	            		res.json({"error" : false,"message" : udata});
	            	}
	            });
			}else{
				var ConfigModel = new CoverageConfigModel(req.body);
				ConfigModel.save(function(err, sdata){
					if(err) {
						response = {"error" : true,"message" : err};
					} else {
						setValues();
						response = {"error" : false,"message" : sdata};
					}
					res.json(response);
				});			
			}
		};
	});	
});

router.post('/collect-payment', function(req, res, next) {
	req.body.address = req.body.address || 'test';
	req.body.zip  = req.body.zip || '999';
	req.body.fname = req.body.fname || ' ';
	req.body.lname = req.body.lname || ' ';
	convergeLib.collectPayment(req.body.fname,req.body.lname,req.body.email,req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv,req.body.amount,req.body.custid,'Payment for Mealdaay Order',req.body.address,req.body.zip)
	.then(function(response){
		console.log("response");
		console.log(response);
		res.json({"error" : false,"message" : response});
	})
	.catch(function(err){
		console.error('error',err);
		res.json({"error" : true,"message" : err});
	});
});

router.post('/verify-card', function(req, res, next) {
	req.body.address = req.body.address || 'test';
	req.body.zip  = req.body.zip || '999';
	req.body.fname = req.body.fname || 'test';
	req.body.lname = req.body.lanme || 'khan';
	// convergeLib.verifyCard(req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv,req.body.address,req.body.zip,req.body.fname,req.body.lname)
	console.log(req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv, req.body.address, req.body.zip, req.body.fname, req.body.lname)
	convergeLib.verifyCard(req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv, req.body.address, req.body.zip, req.body.fname, req.body.lname)
    .then(function(response){
        console.log('response ',response);
        res.json({"error" : false,"message" : response});
    })
    .catch(function(err){
        console.error('error',err);
        res.json({"error" : true,"message" : err});
    });
});

/*
router.post('/apply-generated-token', function(req, res, next) {
	convergeLib.collectPaymentByToken(req.body.cardno, req.body.expmonth, req.body.expdate, req.body.cvv,1.99 ,'1234','this is what i sold')
	.then(function(response){
		console.log('response ',response);
	})
	.catch(function(err){
		console.error('error',err);
	});
});*/



/*router.post('/generate-card-token', function(req, res, next) {
	convergeLib.generateToken(req.body.fname,req.body.lname,req.body.email,req.body.cardnumber, req.body.expirymonth, req.body.expiryyear, req.body.cvv)
	.then(function(response){
		console.log('response ',response);
		res.json({"error" : false,"message" : response});
	})
	.catch(function(err){
		console.error('error',err);
		res.json({"error" : true,"message" : err});
	});
});*/



/*-------------------------------End ConvergeLib--------------------------------------------------------*/







/*-------------------------------Start Stripe--------------------------------------------------------*/

/*function setValues(){
	StripeConfigModel.find({},function(err,data){
		if (err) {
			console.log("error");
		} else{
			console.log("ff", data);
			if(data.length == 1){
				keyPublishable = data[0].keypublishable;
				keySecret = data[0].keysecret;
				stripe = require("stripe")(keySecret);
				console.log("keyAssign");
			}
		}
	});
}

setValues();


router.get('/stripeconfig', function(req, res, next) {
 	var response={};
 	StripeConfigModel.find({},function(err,data){
		if (err) {
			res.json({error: true, message: err});
		} else{
			res.json({error: false, message: data});
		}
	});
});

router.post('/stripeconfig', function(req, res, next) {
 	var response={};
	StripeConfigModel.find({},function(err,fdata){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			if(fdata.length == 1){
            StripeConfigModel.findByIdAndUpdate(fdata[0]._id, req.body, {new:true}, (err, udata)=>{
            	if(err){
					res.json({"error" : true,"message" : err});
            	}else{
            		setValues();
            		res.json({"error" : false,"message" : udata});
            	}
            });
			}else{
				var ConfigModel = new StripeConfigModel(req.body);
				ConfigModel.save(function(err, sdata){
				if(err) {
				response = {"error" : true,"message" : err};
				} else {
					setValues();
				response = {"error" : false,"message" : sdata};
				}
				res.json(response);
				});			
			}
		};
	});	
});*/

/*-------------------------------END Stripe--------------------------------------------------------*/


/*-------------------------------START Order--------------------------------------------------------*/

router.get('/order', function(req, res, next) {
 	var response={};
	orderModel.find({}, null, {sort: {created_at: -1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/pay/amount', function(req, res, next) {
   orderModel.updateMany({restaurantid:req.body.resturantId,status:"delivered","_id":{ $in: req.body.orders }},{ $set: { paid: true } },function(err,data){
	   if (err) {
		   response = {"error" : true,"message" : "Error fetching data"};
	   } else{
		   response = {"error" : false,"message" : data};
	   };
	   res.json(response);
	})
});




router.post('/driverorders', function(req, res, next) {
 	var response={};
	orderModel.find({'restaurantid':{$in:req.body.rids}}, null, {sort: {created_at: -1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.get('/customerorder/:id', function(req, res, next) {
 	var response={};
	orderModel.find({customerid: req.params.id}, null, {sort: {created_at: -1}}, function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
   });

router.post('/driver-order',(req,res,next)=>{
	console.log(req.body,"their");
	let Orderlist = req.body.orders;
	console.log(Orderlist)
	orderModel.find({_id:Orderlist},(err,data)=>{
		if(!err){
			response = {"error" : false,"message" : data};
		}else{
			response = {"error" : true,"message" : "Error fetching data"};
		}
		res.json(response);
	})
});
router.post('/order',function(req, res){
 	var response={};
    var order = new orderModel(req.body);
    order.save(function(err, data){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
   });


router.post("/charge", (req, res) => {
	console.log(req.body.currency);
	let token = req.body.token;
	let amount = req.body.amount * 100;
	console.log("amount", amount);
	let currency = req.body.currency;
	stripe.charges.create({
	amount: amount,
	currency: currency,
	description: "Payment Charge for MealDaay.com.",
	source: token,
	}, function(err, charge) {    		
	// asynchronously called
	if(err){
	res.status(500).json(err);
	}else{

	res.status(200).json(charge);
	}
	});
});



router.put('/order/:id',function(req, res){
	var response={};
	orderModel.findByIdAndUpdate(req.params.id, req.body, function(err, order) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
	   });
	   
	   router.put('/orderStatus/:id',function(req, res){
		var response={};
		orderModel.findByIdAndUpdate(req.params.id, req.body, function(err, order) {
				if(err) {
					response = {"error" : true,"message" : err};
				} else {
					response = {"error" : false,"message" : "Data Update"};
				}
				res.json(response);
			});
		   });
		   




router.get('/order/:id',function(req,res){
 
 // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

	var response={};
	console.log(req.params.id);
	orderModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});



router.get('/orderbussiness',function(req,res){
	var response={};

	orderModel.aggregate([
        {$match: {"status" : "completed"}},
        {
        $group: {
            _id: '$restaurantid', // grouping key - group by field district                
            bussinessamount: { $sum: '$subtotal' }
        }
        }
    ]).exec((err,data) => {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});

});


router.delete('/order/:id',function(req,res){
 
 // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
 
	var response={};
	console.log(req.params.id);
	orderModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END Order--------------------------------------------------------*/

router.get('/restaurantorders/:id',function(req, res){
var response={};
orderModel.find({ restaurantid: req.params.id}, null, {sort: {created_at: -1}}, function(err,data){
	if (err) {
		response = {"error" : true,"message" : err};
	} else{
		response = {"error" : false,"message" : data};
	};
	res.json(response);
  });	
});





module.exports = router;
