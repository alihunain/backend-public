var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();
var config = require('./config')[ "staging"];
var routes = require('./routes/index');
var users = require('./routes/users');
var customers = require('./routes/customer');
var cors = require('cors');
var compression = require('compression');
var app = express();
app.use(compression())
var subscribers = require('./routes/subscriber');
var multer = require('multer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// var db  = mongoose.connect('mongodb://localhost:27017/navedkitchen2');
var db = mongoose.connect(`mongodb://${config.userdb}:${config.passworddb}@${config.host}:${config.dbport}/${config.database}`, function(error) {
    if(error){
        console.log("error in creating connection",error);
    }else{
    console.log(`monogodb connected on mongodb://${config.host}:${config.dbport}/${config.database} and server is listening on ${config.port}`);
    }
  });   
// app.use(cors());
app.use(function(req,res,next){
    req.db = db;
    next();
});

allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  console.log(req.headers.origin);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,x-access-token');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.disable('x-powered-by');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        // cb(null, '/NavaidKitchen/ms-2/public/uploads/');
        // cb(null, './public/uploads/');
        cb(null, __dirname +'/public/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload',upload, function(req, res) {
  console.log(req.file);
  console.log("upload",req.body);
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null,filename:req.file.filename});
    });
});

/*mail configure start*/
var nodemailer = require("nodemailer");
// var smtpTransport = nodemailer.createTransport("SMTP",{
//    service: "Gmail",  // sets automatically host, port and connection security settings
//    auth: {
//        user: "no_reply@mealdaay.com",
//        pass: "Me@lD@@y786"
//    }
// });


var mailConfig = {
  host: "smtp.gmail.com",
  port: 465,
  user: "no-reply@mealdaay.com",
  password: "MealDaay123$",
  secure: true,
  pool: true,
};

var transporter = nodemailer.createTransport({
  pool: mailConfig.pool,
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure, // use TLS
  auth: {
    user: mailConfig.user,
    pass: mailConfig.password,
  },
});



app.use(function(req, res, next) {
    req.mail = transporter;
    next();
});
/*mail configure stop*/



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/customers', customers);
app.use('/subscriber',subscribers);
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
