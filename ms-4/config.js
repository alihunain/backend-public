const config = {
    "development":{
        "host":"localhost",
        "dbport":"27017",
        "port":"4044",
        "username":"root",
        "password":"",
        "database":"navedkitchen4",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx",
        "authSource":"",
        "userdb":"",
        "passworddb":"",
    },
    "staging":{
        "host":"10.137.159.54",
        "dbport":"27017",
        "port":"4044",
        "username":"mealdaay",
        "password":"Mealdaay123$",
        "authSource":"admin",
        "userdb":"mealdaay",
        "passworddb":"Mealdaay123$",
        "database":"navedkitchen4",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    },
 
    "production":{
        "authSource":"admin",
        "host":"db.mealdaay.com",
        "dbport":"27017",
        "port":"4044",
        "username":"root",
        "password":"",
        "authSource":"admin",
        "userdb":"mealdaay",
        "passworddb":"Mealdaay123$",
        "database":"navedkitchen4",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    }
    
};
module.exports = config;