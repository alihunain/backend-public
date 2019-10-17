var express = require('express');
var router = express.Router();
var ratingModel  =  require("../model/Rating.js");

router.get('/', function(req, res, next) {	
	var response={};
	ratingModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

function itemRating(arr,cb){
	let itemArr = []
	let comboArr = []
	let packageArr = []
	for (var i = 0; i < arr.length; i++) {

		for (var j = 0; j < arr[i]['items'].length; j++) {
			console.log( arr[i]['items'][j] )
			let itmIndex = itemArr.findIndex(item=>{ return item['id'] == arr[i]['items'][j]})
			if (itmIndex == -1) {
				itemArr.push({id:arr[i]['items'][j],count:1,average:arr[i]['average']});
			}else{
				let count = itemArr[itmIndex]['count'];
				let average = itemArr[itmIndex]['average'];
				itemArr[itmIndex]['count'] = count+1;
				itemArr[itmIndex]['average'] = average+arr[i]['average'];
			}
		}

		for (var j = 0; j < arr[i]['combo'].length; j++) {
			let itmIndex = comboArr.findIndex(item=>{ return item['id'] == arr[i]['combo'][j]})
			if (itmIndex == -1) {
				comboArr.push({id:arr[i]['combo'][j],count:1,average:arr[i]['average']});
			}else{
				let count = comboArr[itmIndex]['count'];
				let average = comboArr[itmIndex]['average'];
				comboArr[itmIndex]['count'] = count+1;
				comboArr[itmIndex]['average'] = average+arr[i]['average'];
			}
		}

		for (var j = 0; j < arr[i]['package'].length; j++) {
			let itmIndex = packageArr.findIndex(item=>{ return item['id'] == arr[i]['package'][j]})
			if (itmIndex == -1) {
				packageArr.push({id:arr[i]['package'][j],count:1, average:arr[i]['average']});
			}else{
				let count = packageArr[itmIndex]['count'];
				let average = packageArr[itmIndex]['average'];
				packageArr[itmIndex]['count'] = count+1;
				packageArr[itmIndex]['average'] = average+arr[i]['average'];
			}
		}

	}
	cb(false,{ items : itemArr, combo : comboArr, pack : packageArr });			
}


function itemReviewRating(arr,cb){			
	var obj = {"valueOfTimeRating": 0, "deliveryTimeRating": 0, "orderPackagingRating" : 0, count: 0};
	for (var i = 0; i < arr.length; i++) {
		obj["valueOfTimeRating"] += arr[i]["valueOfTimeRating"];
		obj["deliveryTimeRating"] += arr[i]["deliveryTimeRating"];	
		obj["orderPackagingRating"] += arr[i]["orderPackagingRating"];
		obj["count"] = (i+1);
	}
	var newobj = {"valueOfTimeRating": (obj.valueOfTimeRating/obj.count).toFixed(1), "deliveryTimeRating":  (obj.deliveryTimeRating/obj.count).toFixed(1), "orderPackagingRating":  (obj.orderPackagingRating/obj.count).toFixed(1), "review": arr};
	cb(false, newobj);			
}

router.get('/restaurant-rating/:id', function(req, res, next) {	
	var response={};
	ratingModel.find({restaurantId:req.params.id}, function(err,data){				
		itemRating(data,(error,result)=>{
			if (error) {
				response = {"error" : true,"message" : "Error fetching data"};
			} else{
				response = {"error" : false,"message" : result};
			};
			res.json(response);
		})
	});
});

router.get('/customer-rating/:id', function(req, res, next) {	
	var response={};
	ratingModel.find({customerId: req.params.id}, function(err,data){				
			if (err) {
				response = {"error" : true,"message" : "Error fetching data"};
			} else{
				response = {"error" : false,"message" : data};
			};
			res.json(response);
	});
});


router.get('/restaurant-rating-review/:id', function(req, res, next) {	
	var response={};
	ratingModel.find({restaurantId:req.params.id}, function(err,data){				
		itemReviewRating(data,(error,result)=>{
			if (error) {
				response = {"error" : true,"message" : "Error fetching data"};
			} else{
				result.kitchenId = req.params.id;
				result.type = 'rating'
				response = {"error" : false,"message" : result};
			};
			res.json(response);
		})
	});
});


router.get('/restroavg', function(req, res, next) {	
	var response={};

	ratingModel.aggregate([{ "$group": { _id:"$restaurantId", averageQuantity: { $avg: "$average" }}}], function (err, result) {
			if (err) {
			response = {"error" : true,"message" : err};
			} else{
			response = {"error" : false,"message" : result};
			};
			res.json(response);
	});
	});


router.post('/',function(req, res){
	var response={};
	var qry = { orderId : req.body.orderId, customerId : req.body.customerId};
    ratingModel.find(qry, function(err, data){
       if(err){
        	response = {error : true, message: err}
			res.json(response);	
        }else{
        console.log("data", data);	
        if(data.length > 0){	
		ratingModel.update(qry, req.body , null, function(err, data){
				if(err) {
				response = {"error" : true,"message" : err};
				} else {
				response = {"error" : false,"message" : "Data added"};
				}
				res.json(response);
			});
        }else{
			var rating = new ratingModel(req.body);
			rating.save(function(err){
			if(err) {
			response = {"error" : true,"message" : err};
			} else {
			response = {"error" : false,"message" : "Data added"};
			}
			res.json(response);
			});
		}		
		}
	});
});





router.put('/:id',function(req, res){
	var response={};
	ratingModel.findByIdAndUpdate(req.params.id, req.body, function(err, rating) {
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});

router.get('/:id',function(req,res){
	var response={};			
	ratingModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/checkrating',function(req,res){
	var response={};			
	console.log(req.body);
	ratingModel.find(req.body, function(err,data){
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
	ratingModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

router.get('/orderrating/:id',function(req,res){
	var response={};			
	ratingModel.find({"orderId" : req.params.id}, function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

module.exports = router;