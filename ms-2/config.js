const config = {
    "development":{
        "authSource":"",
        "userdb":"",
        "passworddb":"",
        "host":"localhost",
        "dbport":"27017",
        "port":"4024",
        "username":"root",
        "password":"",
        "database":"navedkitchen2",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    },
    "staging":{

        "authSource":"admin",
        "userdb":"admin",
        "passworddb":"Mealdaay123!",
        "host":"10.137.224.233",
        "dbport":"27017",
        "port":"4024",
        "username":"root",
        "password":"",
        "database":"navedkitchen2",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    }, 
    "production":{
        "authSource":"admin",
        "userdb":"mealdaay",
        "passworddb":"Mealdaay123$",
        "host":"db.mealdaay.com",
        "dbport":"27017",
        "port":"4024",
        "username":"root",
        "password":"",
        "database":"navedkitchen2",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    }
    
};
module.exports = config;