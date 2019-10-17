// const express = require('express');
// const router = express.Router();
// const Subscribers  =  require("../model/Subscribers");
// var emails = require('../mail/emailConfig.js');
// router.delete('/:id', function(req, res, next) {	
//     var response={};
//     Subscribers.findByIdAndRemove(req.params.id,function(err,email){
//         console.log(email,req.params.id);
//         if (err) {
//             response = {"error" : true,"message" : "Error fetching data"};
//         } else{
//             response = {"error" : false,"message" : email};
//         };
//         res.json(response);
//     });
// });
// router.get('/', function(req, res, next) {	
// 	var response={};
// 	Subscribers.find({},function(err,data){
// 		if (err) {
// 			response = {"error" : true,"message" : "Error fetching data"};
// 		} else{
// 			response = {"error" : false,"message" : data};
// 		};
// 		res.json(response);
// 	});	
// });


// router.post('/offer/send',async function(req,res){
// 	console.log("email going to send");
// 	user = {};
// 	user._id = "5bb1a14c8030592a0e8ad9dc"
// 	emailToSent = ['mabdullahkhan1996@gmail.com','omegakhan1996@gmail.com'];
// 	try{
// 		emailToSent = await	subscriptionModel.find({}).exec();
// 		console.log(emailToSent);
// 		for(let i  =0  ; i < emailToSent.length ; i ++){
// 		 emails.emailPromotionalShoot(emailToSent[i].email, req.body.username, user._id);
// 		}
// 		console.log({"error" : true,"message" : "MAIL send"});
// 		res.json({"error" : true,"message" : "MAIL send"});
// 	} catch(err){
// 		console.log(err);
// 	}
// });
// router.post('/',function(req,res,next){
//     var response={};
//     if(!req.body.email){
//         response = {"error" : false,"message" : data};
//     }   
//     var Subscriber = new Subscribers(req.body);
//     Subscriber.save(function(err, data){
//     	if(err) {
//             response = {"error" : true,"message" : err};
//         } else {
//             response = {"error" : false,"message" : data};
//         }
//         res.json(response);
//     });
    
// });

// module.exports = router;