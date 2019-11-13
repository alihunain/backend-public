var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

var emailFrom = 'admin@caterdaay.com';

var templateDir = __dirname + '/../email_template';
// var templateDir = '../email_template';

var mailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    user: "admin@caterdaay.com",
    password: "zyumuxfxjvwkoobb",
    secure: true,
    pool: true
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
  

module.exports = {
    emailPromotionalShoot: function(emailTo, mailobject){

        console.log(mailobject);
        ejs.clearCache();
        imageUrl="https://Caterdaay.com/assets/image/Logo1.png";
        // rendering html template (same way can be done for subject, text)
       ejs.renderFile(templateDir + '/promotional.ejs', {mailobject,emailTo,imageUrl},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                console.log("in renderFile",data)
                var options = {
                    from: emailFrom,
                    to: emailTo,
                    subject: 'Caterdaay - Chef Activation',
                    html: data,
                };
                sendmail(options);
                return data;
            });

        //build options
    },
    emailShoot: function(emailTo, username, id) {

        console.log(emailTo, username, id);

        // rendering html template (same way can be done for subject, text)
         ejs.renderFile(templateDir + '/register.ejs', { username: username , token: id},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
               

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Activation',
            html: data,
            text: 'text'
        };
        sendmail(options)});
    }, 
    OrderAcceptedByKitchen: function(emailTo, username, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/CustomerOrderAccepted.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    OrderDriver: function(emailTo, username, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/DriverOrder.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    OrderAcceptedByDriver: function(emailTo, username, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/CustomerOrderAcceptedDriver.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    OrderAcceptedByDriver: function(emailTo, username, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/CustomerOrderAcceptedDriver.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    OrderDriverOnWay: function(emailTo, username, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/CustomerOrderIsOnWay.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    OrderDelivered: function(emailTo, username, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/CustomerOrderIsDelivered.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    customerOrderEmailShoot: function(emailTo, username, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/customerOrder.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    
    MenuIsSetupForFirstTimeEmailShoot: function(emailTo, mailobj) {
        // rendering html template (same way can be done for subject, text)
    //    console.log("order", mailobj,'email',emailTo);
         ejs.renderFile(templateDir + '/menuSetup.ejs', {address: mailobj.address, kitchenName: mailobj.kitchenName, ownerEmail: mailobj.ownerEmail,phoneNumber:mailobj.phoneNumber},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
              
          
                console.log(data);
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Menu is Setup',
            html: data,
            text: 'text'
        };
        sendmail(options)  });
    }
    
    ,

    customerOrderRejectedEmailShoot: function(emailTo, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
         ejs.renderFile(templateDir + '/customerOrderRejected.ejs', {username: order.customerid.email, token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
              
          

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)  });
    },

     kitchenOrderRejectedEmailShoot: function(emailTo, order) {
        // rendering html template (same way can be done for subject, text)
        console.log("order", order);
     ejs.renderFile(templateDir + '/customerOrderCancel.ejs', {username: order.customerid.email, token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }    
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)    });
    }, 
    restroOrderEmailShoot: function(emailTo, username, order) {
        console.log("order", order);
        // rendering html template (same way can be done for subject, text)
        ejs.renderFile(templateDir + '/restroOrder.ejs', { username: username , token: order._id.substr(18,6), order: order},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
      

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Chef Order',
            html: data,
            text: 'text'
        };
        sendmail(options)      });
    },
    driveremailShoot: function(emailTo, username, id) {

        console.log(emailTo, username, id);

        // rendering html template (same way can be done for subject, text)
    ejs.renderFile(templateDir + '/driver.ejs', { username: username , token: id},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                
            

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay - Driver Activation',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },

    referalShoot: function(emailTo, id) {

        // rendering html template (same way can be done for subject, text)
     ejs.renderFile(templateDir + '/referal.ejs', {token: id},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
         
            
        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay Owner Referral link',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },


    partneremailShoot: function(emailTo, username, id) {

        console.log(emailTo, username, id);

        // rendering html template (same way can be done for subject, text)
        ejs.renderFile(templateDir + '/partner.ejs', { username: username , token: id},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
        
          

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Caterdaay Partner Activate Account',
            html: data,
            text: 'text'
        };
        sendmail(options)  });;
    },

    emailAdminDriverShoot: function(username) {

        // rendering html template (same way can be done for subject, text)
    ejs.renderFile(templateDir + '/adminfordriver.ejs', { username: username },
            function(err, data) {
                if (err) {
                    console.log(err);
                }
             
           

        //build options
        var options = {
            from: emailFrom,
            to: "ankurkumarphp@gmail.com",
            subject: 'Activate account for new driver',
            html: data,
            text: 'text'
        };
        sendmail(options) });;
    },

    forgetEmailShoot: function(customer, type) {

        customer['resetPassLink'] = 'https://Caterdaay.com/owner/resetpassword/'+customer._id;

        // rendering html template (same way can be done for subject, text)
      ejs.renderFile(templateDir + '/forgetPassword.ejs', {customer : customer},
            function(err, data) {
                if (err) {
                    console.log(err);
                }


        //build options
        var options = {
            from: emailFrom,
            to: customer.username + " <" + customer.email + " >",
            subject: 'Reset Password',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },
    driverForgetEmailShoot: function(emailTo, username, token) {
            var customer = {'resetPassLink': 'https://Caterdaay.com/customer/driver/reset-password/'+token};
            // customer['resetPassLink'] = 'http://mealdaay.com/customer/driver/reset-password/'+token;

        // rendering html template (same way can be done for subject, text)
         ejs.renderFile(templateDir + '/driverForgetPassword.ejs', {"customer" : customer, "username": username},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
          
         

        //build options
        var options = {
            from: emailFrom,
            to: username + " <" + emailTo + " >",
            subject: 'Reset Password',
            html: data,
            text: 'text'
        };
        sendmail(options)   });;
    }


};


function sendmail(options){
    transporter.sendMail(options, function(error, info) {
        if (error) {
            console.log('Message not sent');
            console.log(error);
            return false;
        } else {
            console.log('Message sent Successfully !!!');
            return true;
        };
    });
}