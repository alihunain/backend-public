const config = {
    "development":{
        "authSource":"",
        "userdb":"",
        "passworddb":"",
        "host":"localhost",
        "dbport":"27017",
        "port":"4004",
        "username":"root",
        "password":"",
        "database":"navedkitchen",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    },
     "staging":{
        "host":"10.137.159.54",
        "dbport":"27017",
        "port":"4004",
        "username":"mealdaay",
        "password":"Mealdaay123$",
        "authSource":"admin",
        "userdb":"mealdaay",
        "passworddb":"Mealdaay123$",
        "database":"navedkitchen",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    },

    "production":{
        "authSource":"admin",
        "userdb":"mealdaay",
        "passworddb":"Mealdaay123$",
        "host":"db.mealdaay.com",
        "dbport":"27017",
        "port":"4004",
        "username":"root",
        "password":"",
        "database":"navedkitchen",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    }
    
};
module.exports = config;