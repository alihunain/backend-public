var express = require('express');
var router = express.Router();
var kitchenMenuModel  =  require("../model/Kitchenmenu.js");
var itemModel  =  require("../model/Item.js");
var weekmonthModel  =  require("../model/Weekmonth.js");
var ComboModel  =  require("../model/combo.js");
var OfferModel  =  require("../model/offer.js");
var authenticate = require('../auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*-------------------------------START MENU--------------------------------------------------------*/
router.post('/applying/charges/combo', function (req, res, next){
	let percentage =  req.body.combocharge / 100;
	ComboModel.find({},async (err,data)=>{
		if(err){
			response = {"error" : true,"message" : "Error fetching data"};
		}
		for(let i = 0 ; i  < data.length ; i++){
			let percentagePrice =  parseFloat(data[i].totalprice) * percentage;
			// console.log(percentagePrice,data[i].totalprice);
			data[i].finalcomboprice  =  (parseFloat(data[i].totalprice) + percentagePrice);
			// console.log(data[i].finalcomboprice);
			await	data[i].save()
		}
		res.json({error:false, message :" Update All final Combo Prices"});

	});
});
router.post('/applying/charges/menu', function (req, res, next){
	let percentage =  req.body.itemcharge / 100;
	itemModel.find({},async (err,data)=>{
		if(err){
			response = {"error" : true,"message" : "Error fetching data"};
		}
		for(let i = 0 ; i  < data.length ; i++){
			let percentagePrice =  parseFloat(data[i].baseprice) * percentage;
			// console.log(percentagePrice,data[i].baseprice);
			if(data[i].baseprice){
			data[i].price  =  (parseFloat(data[i].baseprice) + percentagePrice);
			// console.log(data[i].price);
			}
			await	data[i].save()
		}
		res.json({error:false, message :" Update All final Combo Prices"});

	});
});
router.post('/applying/charges/mealpackage', function (req, res, next){
	let percentage =  req.body.mealpackagecharge / 100;
	weekmonthModel.find({},async (err,data)=>{
		
		if(err){
			response = {"error" : true,"message" : "Error fetching data"};
		}
		for(let i = 0 ; i  < data.length ; i++){
			let discountOftotal =  data[i].totalprice -  (data[i].totalprice * data[i].discount / 100 )


			let percentagePrice =  parseFloat(discountOftotal) * percentage;
						
			data[i].packageprice  =  (parseFloat(discountOftotal) + percentagePrice);
			// console.log(data[i].packageprice,'Packageprice');
			for (let j =0 ; j < data[i].dayandmenus.length; j++){
				for(let z =0 ; z < data[i].dayandmenus[j].menuids.length ; z ++){

					data[i].dayandmenus[j].menuids[z].price =  data[i].dayandmenus[j].menuids[z].baseprice +  (data[i].dayandmenus[j].menuids[z].baseprice * percentage)
					// console.log(data[i]._doc.dayandmenus[j].menuids[z].price, ' PRICES',data[i]._doc.dayandmenus[j].menuids[z].baseprice,'BASE')
				}
			}
			data[i].markModified("dayandmenus")
			await	data[i].save()
		}
		res.json({error:false, message :" Update All final Combo Prices"});

	});
});


router.get('/menu', function(req, res, next) {
	var response={};
	kitchenMenuModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

// router.post('/add/mealdaay/charges', function (req,res,next){})
router.get('/menu-list/:id', function(req, res, next) {
	var response={};
	kitchenMenuModel.find({kitchenId : req.params.id}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			data.type="menu"
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/menu',function(req, res){
	var response={};
    var menu = new kitchenMenuModel(req.body);
    menu.save(function(err, data){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

router.put('/menu/:id',function(req, res){
	var response={};
	kitchenMenuModel.findByIdAndUpdate(req.params.id, req.body, function(err, menu) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/menu/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	kitchenMenuModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/menu/:id/:kitchenId',function(req,res){
	var response={};	
	kitchenMenuModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			itemModel.remove({menuId: req.params.id}, function (err) {           
            if (err) return handleError(err);
              // removed!
        	});
			weekmonthModel.find({kitchenId : req.params.kitchenId}, function(err, data){                 
                for(var i=0; i<data.length; i++){                  
                  for(var j = 0; j<data[i].dayandmenus.length; j++){                      
                      var index = data[i].dayandmenus[j].menuids.findIndex(item  => item.mid == req.params.id); 
                      if(index != -1){
                          weekmonthModel.remove({_id : data[i]._id}, function(err, data){
                          	if(err){console.log(err);}else{console.log(data);}                            
                          });
                      }
                  } 
               }
               });

			response = {"error" : false,"message" : "Deleted Successfully"};

		    };
		res.json(response);
	});	
});


router.delete('/delete-all-kitchen-menus/:id',function(req,res){
	var response={};
	kitchenMenuModel.remove({kitchenId:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			weekmonthModel.remove({kitchenId : req.params.id}, function(err2, data2){
				if (err2) {
					response = {"error" : true,"message" : "Error fetching data"};
				}else{
					ComboModel.remove({kitchenId : req.params.id}, function(err3, data3){
						if (err3) {
							response = {"error" : true,"message" : "Error fetching data"};
						}else{
							OfferModel.remove({kitchenId : req.params.id}, function(err4, data4){
								if (err4) {
									response = {"error" : true,"message" : "Error fetching data"};
								}else{
									response = {"error" : false,"message" : "Deleted Successfully"};
								}
							});
						}
					});
					response = {"error" : false,"message" : "Deleted Successfully"};
				}
			});
		}
		res.json(response);
	});
});
/*-------------------------------END MENU--------------------------------------------------------*/




/*-------------------------------Start weekly--------------------------------------------------------*/
router.get('/weekmonth', function(req, res, next) {
	var response={};
	weekmonthModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/weekmonth-limited', function(req, res, next) {
	var response={};
	weekmonthModel.find({}, null, {sort: {created_at: 1}, limit : 12},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/weekmonth-list/:id', function(req, res, next) {
	var response={};
	weekmonthModel.find({kitchenId: req.params.id}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/weekmonth',function(req, res){
	var response={};
    var wm = new weekmonthModel(req.body);
    wm.save(function(err, data){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});



router.put('/weekmonth/:id',function(req, res){
	var response={};
	weekmonthModel.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/weekmonth/:id',function(req,res){
	var response={};	
	weekmonthModel.findById({_id : req.params.id}).populate("combo").exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/weekmonth/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	weekmonthModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});


/*-------------------------------END Weekly--------------------------------------------------------*/





/*-------------------------------START ITEM--------------------------------------------------------*/

router.get('/item', function(req, res, next) {
	var response={};
	itemModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.get('/item-limited', function(req, res, next) {
	var response={};
	itemModel.find({}, null, {sort: {created_at: 1}, limit : 12},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});



router.get('/item-list/:id', function(req, res, next) {
	var response={};
	itemModel.find({ kitchenId : req.params.id }).populate("menuId").exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
		
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/active-items/:id', function(req, res, next) {
	var response={};
	itemModel.find({ kitchenId : req.params.id, status : true }).populate("menuId").exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/item',function(req, res){
	var response={};
	var item = new itemModel(req.body);
	console.log(req.body);
    item.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/item/:id',function(req, res){
	var response={};
	itemModel.findByIdAndUpdate(req.params.id, req.body, function(err, item) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/item/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	itemModel.findById(req.params.id).populate('menuId').exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/item/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	itemModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.delete('/item/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	itemModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

router.delete('/delete-all-kitchen-items/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	itemModel.remove({kitchenId:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END ITEM--------------------------------------------------------*/



/*-------------------------------START Combo--------------------------------------------------------*/

router.get('/combo', function(req, res, next) {
	var response={};
	ComboModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/combo-list/:id', function(req, res, next) {
	var response={};
	ComboModel.find({kitchenId : req.params.id}, null, {sort: {created_at: 1}}).populate("menuId").exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/active-combos/:id', function(req, res, next) {
	var response={};
	ComboModel.find({kitchenId : req.params.id , status : true}, null, {sort: {created_at: 1}}).populate("menuId").exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/combo',function(req, res){
	var response={};
    var combo = new ComboModel(req.body);
    combo.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});


router.put('/combo/:id',function(req, res){
	var response={};
	ComboModel.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
      });
});


router.get('/combo/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	ComboModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.delete('/combo/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	ComboModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END Combo--------------------------------------------------------*/


/*-------------------------------START Offer--------------------------------------------------------*/

router.get('/offer', function(req, res, next) {
	var response={};
	OfferModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.get('/offer-list/:id', function(req, res, next) {
			
	var response={};
	OfferModel.find({kitchenId : req.params.id}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/offer',function(req, res){
	var response={};
    var offer = new OfferModel(req.body);
    offer.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.post('/offer/redeem',function(req, res){
	var date1 = new Date();
	var datearr = date1.toLocaleDateString();
	var response={};
	OfferModel.find({ "couponcode" : req.body.couponcode, "kitchenId" : req.body.kitchenId }, (err, data)=>{
 		if(err) {
            response = {"error" : true,"message" : err};
        } else {
        	if(data.length > 0){        		
        		var ind = new Date(data[0].indate);
        		var end = new Date(data[0].expirydate);
        		ind.setHours(0,0,1,0);
        		end.setHours(0,0,1,0);
        		date1.setHours(0,0,1,0);        		
	        		if((ind <= date1) && (date1 <= end)){
	                console.log(ind, date1, end);			
	            	response = {"error" : false,"message" : data};        			
	        		}else{
	        	    console.log(ind, date1, end);		
	        		 response = {"error" : true,"message" : "Offer not available!"};		
	        		}
	        	}else{
	            console.log(ind, date1, end);		
	            response = {"error" : true,"message" : "Offer not available!"};		
	        	}
        }
        res.json(response);
	});
});


router.put('/offer/:id',function(req, res){
	var response={};
	OfferModel.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
      });
});


router.get('/offer/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	OfferModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.delete('/offer/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	OfferModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END Offer--------------------------------------------------------*/




/*-------------------------------Start FRONTEND SERVICE FOR WEEKMONTH--------------------------------------------------------*/

router.get('/weekly-list/:id', function(req, res, next) {
	var response={};
	weekmonthModel.find({kitchenId: req.params.id}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/active-mealpackages/:id', function(req, res, next) {
	var response={};
	weekmonthModel.find({kitchenId: req.params.id, status : true}, null, {sort: {created_at: 1}}).populate("combo").exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/monthly-list/:id', function(req, res, next) {
	var response={};
	weekmonthModel.find({kitchenId: req.params.id, type: 'monthly'}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/itemfiltersstr',function(req,res){
	var response={};

	  var ex = new RegExp('^'+req.body.str+'.*', "i");
	  console.log(ex)
	  itemModel
	  .find({name:{ $regex: ex}})
      .exec(function(err, data){	   		
		if (err) {
			console.log(err);
			//response = {"error" : true,"message" : "Error fetching data"};
		}	  	
	  response.data1 = data;	
      kitchenMenuModel
	  .find({name:{ $regex: ex}})
      .exec(function(err, data){      	
      	if(err){
         console.log(err);
      	}
      	else{
      		response.data2 = data;			
		};
       	res.json({"error" : false,"message" : response.data1.concat(response.data2)});	
      });	
     }); 

   });


/*-------------------------------END FRONTEND SERVICE FOR WEEKMONTH--------------------------------------------------------*/

module.exports = router;
