var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

var emailFrom = "admin@caterdaay.com";

var templateDir = __dirname + '/../email_template';
//var templateDir = '../ms-3/email_template';

var mailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    user: "admin@caterdaay.com",
    password: "@dm1nCat3rdaay",
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

    forgetEmailShoot: function(customer) {
        console.log(customer);
        customer['resetPassLink'] = 'https://beta.caterdaay.com/admin/reset-password/'+customer._id;
        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/forgetPassword.ejs', {customer : customer},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
       

        //build options
        var options = {
            from: emailFrom,
            to: customer.username,
            subject: 'Caterdaay admin reset password',
            html: data,
            text: 'text'
        };
        sendmail(options)});
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
