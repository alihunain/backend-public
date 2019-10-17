var jwt = require('jsonwebtoken');
const Iron = require('iron');
var config = require('./config')[process.env.NODE_ENV || "development"];
exports.User = function (req, res, next) {
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
        console.log("geting Eror")
        next("error");
    }
}
exports.Unseal = function (req, res, next) {
    Iron.unseal(req._user.data, config.sealpass, Iron.defaults).then((unsealed) => {

            req._user = unsealed;
            console.log(req._user)
            next();
        }
    ).catch((err)=>{console.log(err)});
};