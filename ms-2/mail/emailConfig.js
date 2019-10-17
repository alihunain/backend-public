var nodemailer = require('nodemailer');
var ejs = require('ejs');

var emailFrom = 'no_reply@mealdaay.com';

var templateDir = __dirname + '/../email_template';
// var templateDir = '../ms-2/email_template';

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
  

module.exports = {
    emailPromotionalShoot: function(subscriberID,emailTo, mailobject){

        ejs.clearCache();
        imageUrl="https://mealdaay.com/assets/image/Logo1.png";
        // rendering html template (same way can be done for subject, text)
       ejs.renderFile(templateDir + '/promotional.ejs', {subscriberID,mailobject,emailTo,imageUrl},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
           //     console.log("in renderFile",data)
                var options = {
                    from: emailFrom,
                    to: emailTo,
                    subject: 'MealDaay - Deals',
                    html: data,
                };
                 sendmail(options);
                return data;
            });
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