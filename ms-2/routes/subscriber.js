const express = require('express');
const router = express.Router();
const Subscribers  =  require("../model/subscription");
var emails = require('../mail/emailConfig.js');
var Offers = require('../model/offer');
// var subscribers = require('./routes/subscriber');
router.delete('/:id', function(req, res, next) {	
    var response={};
    Subscribers.findByIdAndRemove(req.params.id,function(err,email){
        console.log(email,req.params.id);
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : email};
        };
        res.json(response);
    });
});
router.get('/', function(req, res, next) {	
	var response={};
	Subscribers.find({},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.get('/offer/send',async function(req,res,next){
	console.log("email going to send");
    user = {};
    var date = null;
	date = new Date();
	console.log(date)
	try{
      let  offer = await Offers.find({}).exec();
      let validOffers = [] ;
      for(let j =0 ; j < offer.length ; j ++ ){
          inDate = new Date(offer[j].indate);
          expirydate = new  Date(offer[j].expirydate)
        if(inDate < date && expirydate > date ){
            validOffers.push(offer[j]);
        }
      }
        console.log(validOffers,"Offers");

		emailToSent = await	Subscribers.find({}).exec();
        console.log(emailToSent,"email to Sent");
        console.log("dumy");
        if(offer.length > 0 ){
		for(let i  =0  ; i < emailToSent.length ; i ++){
		 emails.emailPromotionalShoot(emailToSent[i]._id,emailToSent[i].email, offer);
        }
    }
		console.log({"error" : true,"message" : "MAIL send"});
		res.json({"error" : true,"message" : "MAIL send"});
	} catch(err){
		console.log(err);
	}
});
router.post('/',function(req,res,next){
    var response={};
    if(!req.body.email){
        response = {"error" : false,"message" : data};
    }   
    var Subscriber = new Subscribers(req.body);
    Subscriber.save(function(err, data){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
    
});

module.exports = router;