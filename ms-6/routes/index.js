var express = require('express');
var router = express.Router();
var countryModel  =  require("../model/Country.js");
var stateModel  =  require("../model/State.js");
var cityModel  =  require("../model/City.js");
var ownerModel  =  require("../model/Owner.js");
var languageModel  =  require("../model/Multilanguage.js");
var cuisinesModel  =  require("../model/Cuisines.js");
var pageModel  =  require("../model/Page.js");
var deliveryModel  =  require("../model/Deliverycharges.js");
var mealdaayModel  =  require("../model/MealdaayCharges");



router.get('/mealdaaycharges',function(req,res,next){
	var response={};
	mealdaayModel.find({},function(err,data){
   if (err) {
	   res.json({error: true, message: err});
   } else{
	   res.json({error: false, message: data});
   };
   });
});
router.post('/mealdaaycharges', function(req, res, next) {
	var response={};
	mealdaayModel.find({},function(err,fdata){
	   if (err) {
		   response = {"error" : true,"message" : "Error fetching data"};
	   } else{
		   if(fdata.length == 1){
			mealdaayModel.findByIdAndUpdate(fdata[0]._id, req.body, {new:true}, (err, udata)=>{
			   if(err){
			   res.json({"error" : true,"message" : err});
			   }else{            		
			   res.json({"error" : false,"message" : udata});
			   }
		   });
		   }else{
			   var ConfigModel = new mealdaayModel(req.body);
			   ConfigModel.save(function(err, sdata){
			   if(err) {
			   response = {"error" : true,"message" : err};
			   } else {					
			   response = {"error" : false,"message" : sdata};
			   }
			   res.json(response);
			   });			
		   }
	   };
   });	
});
router.get('/deliverycharges', function(req, res, next) {
 	var response={};
 	deliveryModel.find({},function(err,data){
	if (err) {
		res.json({error: true, message: err});
	} else{
		res.json({error: false, message: data});
	};
	});
  });

router.post('/deliverycharges', function(req, res, next) {
 	var response={};
	deliveryModel.find({},function(err,fdata){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			if(fdata.length == 1){
            deliveryModel.findByIdAndUpdate(fdata[0]._id, req.body, {new:true}, (err, udata)=>{
            	if(err){
				res.json({"error" : true,"message" : err});
            	}else{            		
            	res.json({"error" : false,"message" : udata});
            	}
            });
			}else{
				var ConfigModel = new deliveryModel(req.body);
				ConfigModel.save(function(err, sdata){
				if(err) {
				response = {"error" : true,"message" : err};
				} else {					
				response = {"error" : false,"message" : sdata};
				}
				res.json(response);
				});			
			}
		};
	});	
});

router.post('/getcountryid', function(req, res, next) {
    console.log(req.body);

	var countryi = {};
	countryi.activestatus = true;
	if(req.body.countryname && req.body.countryname != '' && typeof req.body.countryname != 'undefined'){
       countryi.countryName = req.body.countryname.toLowerCase();
	}

    console.log(countryi);

	var response={};
	countryModel.find(countryi, function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
});
});

router.post('/cuisines/multiple',function(req, res){
	console.log(req.body);
		var response={};
		cuisinesModel.find({_id: {$in: req.body.cuisines}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
		});
	});

router.get('/countrylist', function(req, res, next) {
 
 // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

var response={};
countryModel.find({activestatus : true}, function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});

});


router.post('/getcitylist', function(req, res, next) {
	
	var response={};
	cityModel.find({}).populate('countryId', null, {activestatus : true}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{	
            var datai = [];
            if(data.length > 0){
            for(var i = 0; i<data.length; i++){
            	if(data[i].countryId != null){
	            if(data[i].countryId._id == req.body.countryid){
                   datai.push(data[i]);
		    	} 
            	}		    	              
		      }		
		  }		    		      
			response = {"error" : false,"message" : datai};
		};
		res.json(response);
	});	
});



/*router.post('/getcitylistsearch', function(req, res, next) {	
	var response={};
	cityModel.find({}).populate('countryId', null, {activestatus : true}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
			res.json(response);
		    } else{	
            var datai = [];
            if(data.length > 0){
            	console.log(data);              
               for(var i = 0; i<data.length; i++){
               	console.log(data[i].countryId);
            	if(data[i].countryId != null){
                   datai.push(data[i]);
            	}		    	              
		      }		
		      response = {"error" : false,"message" : datai};
		      res.json(response);
		  }	
		};

		//res.json(response);

	});	
});*/




/*-------------------------------START PAGE--------------------------------------------------------*/

router.get('/page', function(req, res, next) {
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	pageModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/page',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
    var page = new pageModel(req.body);
    page.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});


router.put('/page/:id',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	pageModel.findByIdAndUpdate(req.params.id, req.body, function(err, page) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});


router.get('/page/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	pageModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.get('/pages/:url',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.url);
	pageModel.find({url : req.params.url},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/page/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	pageModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END PAGE--------------------------------------------------------*/

/*-------------------------------START LANGUAGE--------------------------------------------------------*/

router.get('/language', function(req, res, next) {
	var response={};
	languageModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data };
		};
		res.json(response);
	});	
});

router.post('/language',function(req, res){
	var response={};
    var language = new languageModel(req.body);
    language.save(function(err, data){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/language/:id',function(req, res){
	var response={};
	languageModel.findByIdAndUpdate(req.params.id, req.body, function(err, language) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/language/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	languageModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/language/:id',function(req,res){
	var response={};
	languageModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END LANGUAGE--------------------------------------------------------*/

/*-------------------------------START COUNTRY--------------------------------------------------------*/

router.get('/country', function(req, res, next) {
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	countryModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/country',function(req, res){
	
	var countryc = req.body.countryName;
    req.body.countryName = countryc.toLowerCase();
    console.log(req.body.countryName);
    
	var response={};
	var country = new countryModel(req.body);
    countryModel.find({countryName : req.body.countryName}, function(err, data){
            if(err) {
              response = {"error" : true,"message" : err};
              } else {
            	if(data.length > 0){
                response = {"error" : true,"message" : data , "status" : "Already exist"};	
                 res.json(response);	
            	}else{
					 country.save(function(err){
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

router.put('/country/:id',function(req, res){

	 if(req.body.countryName){
	    req.body.countryName = req.body.countryName.toLowerCase(); 	
	    }
	var response={};
	countryModel.find({countryName: req.body.countryName}, function(err, country) {
		if(err) {
	            response = {"error" : true,"message" : err};
	            res.json(response);
	        } else {
	        	if(country.length > 0){
	            response = {"error" : true,"message" : "Already exist."};
	            res.json(response);
	        	}else{
				countryModel.findByIdAndUpdate(req.params.id, req.body, function(err, country) {
				if(err) {
				response = {"error" : true,"message" : err};
				} else {
				response = {"error" : false,"message" : "Data Update"};
				}
				res.json(response);
				});
	        	}
	        }
      });
});


router.put('/country-update/:id',function(req, res){
var response = {};
countryModel.findByIdAndUpdate(req.params.id, req.body, function(err, country) {
	if(err) {
	response = {"error" : true,"message" : err};
	} else {
	response = {"error" : false,"message" : "Data Update"};
	}
	res.json(response);
	});
 });

router.get('/country/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	countryModel.findById(req.params.id, function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/country/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	countryModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			cityModel.remove({countryId : req.params.id}, function(err, datae){
                response = {"error" : false,"message" : "Deleted Successfully"};
			});			
		};
		res.json(response);
	});	
});
/*-------------------------------END COUNTRY--------------------------------------------------------*/

/*-------------------------------START STATE--------------------------------------------------------*/
router.get('/state', function(req, res, next) {
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	stateModel.find({}).populate('countryId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/state',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
    var state = new stateModel(req.body);
    state.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/state/:id',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	stateModel.findByIdAndUpdate(req.params.id, req.body, function(err, state) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/state/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	stateModel.findById(req.params.id).populate('countryId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/state/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	stateModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END STATE--------------------------------------------------------*/

/*-------------------------------START CITY--------------------------------------------------------*/
router.get('/city', function(req, res, next) {
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	cityModel.find({}).populate('countryId', null, {activestatus : true}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{	
            var datai = [];
		    for(var i = 0; i<data.length; i++){
		    	if(data[i].countryId != null){
                   datai.push(data[i]);
		    	}               
		      }			      
			response = {"error" : false,"message" : datai};
		};
		res.json(response);
	});	
});


router.post('/city',function(req, res){

 // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
    var cityc = req.body.cityName;
    req.body.cityName = cityc.toLowerCase();
	var response={};
    var city = new cityModel(req.body);
    city.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});


router.put('/city/:id',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }

	 if(req.body.cityName){
	 	var cityc = req.body.cityName;
	    req.body.cityName = cityc.toLowerCase();
	 }
    
	var response={};
	cityModel.findByIdAndUpdate(req.params.id, req.body, function(err, city) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});


router.get('/city/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	cityModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/city/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	cityModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END CITY--------------------------------------------------------*/

/*-------------------------------START CITY--------------------------------------------------------*/
router.get('/owner', function(req, res, next) {
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	ownerModel.find({}).populate('countryId').populate('stateId').exec(function (err, data) {
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

router.put('/owner/:id',function(req, res){
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
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/owner/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	ownerModel.findById(req.params.id).populate('countryId').populate('stateId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/owner/:id',function(req,res){
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
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END CITY--------------------------------------------------------*/


/*-------------------------------START  Cuisines --------------------------------------------------------*/

router.get('/cuisines', function(req, res, next) {
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	cuisinesModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/cuisines',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
    var cuisines = new cuisinesModel(req.body);
    cuisines.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});




router.put('/cuisines/:id',function(req, res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	cuisinesModel.findByIdAndUpdate(req.params.id, req.body, function(err, cuisines) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/cuisines/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	cuisinesModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/cuisines/:id',function(req,res){
	// if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
	var response={};
	console.log(req.params.id);
	cuisinesModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END Cuisines--------------------------------------------------------*/


module.exports = router;
