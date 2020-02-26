var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

var emailFrom = 'admin@caterdaay.com';

var templateDir = __dirname + '/../email_template';
var mailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    user: "admin@caterdaay.com",
    password: "@dm1nCat3rdaay",
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
  
module.exports = {

    emailShoot: function(emailTo, username, id) {

        /*console.log(emailTo, username, id);*/

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
            subject: 'Activate Account',
            html: data,
            text: 'text'
        };
        sendmail(options)});
    },

emailAdminShoot: function(emailTo, username, id, password) {

        console.log(emailTo, username, id);

        // rendering html template (same way can be done for subject, text)
         ejs.renderFile(templateDir + '/register.ejs', { username: username , password : password, token: id},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                
            

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'Activate Account',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    },

    forgetEmailShoot: function(customer, type) {
        console.log(customer);
        console.log('https://caterdaay.com/customer/reset-password/'+customer._id);
        if (type == 'cust') {
            customer['resetPassLink'] = 'https://caterdaay.com/customer/reset-password/'+customer._id;
            /*customer['resetPassLink'] = 'http://localhost:4200/customer/reset-password/'+customer._id;*/
        }else{
            customer['resetPassLink'] = 'https://caterdaay.com/admin/reset-password/'+customer._id;
            /*customer['resetPassLink'] = 'http://localhost:4200/admin/reset-password/'+customer._id;*/
        }

        console.log(customer);

        // rendering html template (same way can be done for subject, text)
         ejs.renderFile(templateDir + '/forgetPassword.ejs', {customer : customer},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
               
            

        //build options
        var options = {
            from: emailFrom,
            to: customer.firstname + " <" + customer.email + " >",
            subject: 'Reset Password',
            html: data,
            text: 'text'
        };
        sendmail(options)});;
    }
};


function sendmail(options){
    transporter.sendMail(options, function(error, info) {
        if (error) {
            console.log('Message not sent');
            console.log(error);
            return false;
        } else {
            console.log('Message sent Successfully !!!',info);
            return true;
        };
    });
}
