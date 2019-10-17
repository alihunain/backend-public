var express = require('express');
var router = express.Router();
var ingredientsModel  =  require("../model/ingredients");
var categoryModel = require('../model/category');



router.get('/',  function(req, res, next){
    var response={};
    ingredientsModel.find({} ,async function(err,data){
        if(err) {
            response = {"error" : true,"message" : err};
        }
        for(let i = 0 ; i < data.length ; i ++){    
            if(data[i]._doc.category){
                try{
            await categoryModel.findById(data[i].category,(err,cat)=>{
                if(err){
                    console.log(err,'ERROR');
                }
                console.log(data[i]);
                data[i].category = cat;
            });
        }catch(err){
            console.log(err,'Error')
        }
        }
        }
        response = {"error" : false,"message" : "Data added",data:data};
        res.json(response);
    });
});
router.get('/items',function(req,res,next){
    var response={};
    categoryModel.find({} ,async function(err,data){
        let cat = data; 
        if(err) {
            response = {"error" : true,"message" : err};
        }
        // console.log(data);
        for(let j =0 ; j < cat.length ; j++){
          //  console.log(data[j]);
          cat[j]._doc.grocery = [];

            if(cat[j].items.length > 0){
        for(let i = 0 ; i < cat[j]._doc.items.length ; i ++){    
            await ingredientsModel.findById(cat[j].items[i],(err,ing)=>{
            //   console.log(cat[j])
                if(err){
                    response = {"error" : true,"message" : err};
                }else{

                    cat[j]._doc.grocery.push(ing);
                }
            });
        }
        }
    }

        response = {"error" : false,"message" : "Category lists",data:cat};
        res.json(response);
    });
});
router.post('/',function(req, res){
    var response={};
    var ingredients = new ingredientsModel(req.body);
    //console.log(req.body);
    ingredients.save(function(err, data){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added",data:data};
        //    console.log('ass',data);
            categoryModel.findByIdAndUpdate(req.body.category,{$addToSet:{items:data._id}},function(error,cat){
                if(error){
                    console.log(error);
                    response = {"error" : false,"message" : "Error on category Model"};
                }else{
                 
                }
                res.json(response);
            });
        }
       
    });
});
router.post('/category',function (req,res){
    var category = new categoryModel(req.body);
    category.save(function(err, data){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added",data:data};
        }
        res.json(response);
    });
});
router.get('/category',function (req,res){

        categoryModel.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "category",data:data};
            }
            res.json(response);
        });
});
router.put('/category/:id',function (req,res){
    categoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true} ,function(err, data) {
        if(err) {
            response = {"error" : true,"message" : err};
            res.json(response);
        } else {
   
            response = {"error" : false,"message" : data};
            res.json(response);

            }
    });
});

router.put('/discountChef',async function(req,res){
    // console.log(req.body)
 for(let i =0 ; i < req.body.ingredients.length ; i++ ){
  await  ingredientsModel.findById({_id:req.body.ingredients[i]._id},async function (err,data){
            // console.log(data,'data');
            discountPercentage =  req.body.percentage / 100;
            if(req.body.chefSelected){
                data.chefPrice  = data.basePrice + ( data.basePrice * discountPercentage) ;

            }if(req.body.customerSelected){
                data.customerPrice  = data.basePrice + ( data.basePrice * discountPercentage);
            }
                    await data.save();
            

            // res.json({error:false,message:data});
    });
}
res.json({error:false,message:'All values are updates'});
    });
router.put('/:id',function(req, res){
    var response={};
    // console.log(req.body,req.params.id)
    ingredientsModel.findByIdAndUpdate(req.params.id, req.body, {new: true} ,function(err, data) {
        if(err) {
            response = {"error" : true,"message" : err};
            res.json(response);
        } else {
            response = {"error" : false,"message" : data};
            if(req.body.category == req.body.oldcategory){
            res.json(response);
            }else{
                categoryModel.findByIdAndUpdate(req.body.oldcategory,{$pull:{"items":req.params.id}},function(err,cat){
                    if (err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                    }
                    // console.log(cat);
                 //   res.json(response);
                 categoryModel.findByIdAndUpdate(req.body.category,{$addToSet:{items:data._id}},function(error,cat){
                    if(error){
                        // console.log(error);
                        response = {"error" : false,"message" : "Error on category Model"};
                    }else{
                     
                    }
                    res.json(response);
                });
                  });
            }
            }
    });
});

router.get('/name/:name', function(req, res, next){
    var response={};
    ingredientsModel.findOne({name:req.params.name}).exec(function(err,data){
        if (err) {
        response = {"error" : true,"message" : "Error fetching data"};
        } else{
        response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});
router.get('/:id', function(req, res, next){
    var response={};
    ingredientsModel.findById(req.params.id).exec(function(err,data){
        if (err) {
        response = {"error" : true,"message" : "Error fetching data"};
        } else{
        response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});
router.delete('/:id/:catid',function(req,res){
    var response={};
    // console.log('delete',req.params.id,req.params.catid);
    ingredientsModel.remove({_id:req.params.id}, function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
          categoryModel.findByIdAndUpdate(req.params.catid,{$pull:{"items":req.params.id}},function(err,cat){
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            }
            // console.log(cat);
            res.json(response);
          });
        };

        
    });
});
module.exports = router;