// User defined model
var Customer = require('./model/customer');
// User defined classes
var config = require('./config')[process.env.NODE_ENV || "development"];
// require packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Iron = require('iron'); // used to encraypt and decraypt token on server side
exports.local = passport.use(new LocalStrategy(Customer.authenticate()));
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());
exports.Unseal = function (req, res, next) {
    Iron.unseal(req._user.data, config.sealpass, Iron.defaults).then((unsealed) => {

            req._user = unsealed;
            console.log(req._user)
            next();
        }
    ).catch((err)=>{console.log(err)});
};
exports.Customer = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers[`x-access-token`] || req.headers['Authorization'];
    if (token) {
        // verifies secret and checks exp
        console.log(token,'token');
        jwt.verify(token, config.secretkey , function (err, decoded) {
            if (err) {
                console.log("Error");
                next(err);
            } else {
                // if everything is good, save to request for use in other routes
                console.log(decoded,"Decoded");
                req._user = decoded;
                next();
            }
        });
    } else {
        console.log("geting Eror due to no token provided")
        next("geting Eror due to no token provided");
    }
}
const getToken = function (user, expiresIn) {
    return jwt.sign(user, config.secretkey, {
        expiresIn: expiresIn || 3600
    });
};
exports.GetLoginData = function (user, expiry) {
    console.log(user);
    const userData = {
        _id: user._id
    };
    return new Promise((resolve, reject) => {
        Iron.seal(userData, config.sealpass, Iron.defaults).then((sealed) => {
            const token = getToken({
                data: sealed
            }, expiry || `30 days`);
            const data = {
                token: token,
                user: userData
            };
            console.log("data", data);
            resolve(data);
        }).catch((c) => {reject()});
    });
};