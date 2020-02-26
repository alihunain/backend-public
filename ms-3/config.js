const config = {
    "development":{
        "authSource":"",
        "userdb":"",
        "passworddb":"",
        "host":"localhost",
        "dbport":"27017",
        "port":"4034",
        "username":"root",
        "password":"",
        "database":"navedkitchen3",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx",
        "instagramaccesstoken":"8304379885.03c8df0.91320964cca845e6bd4bcd9402aa9b74",
        "instagramuserid":"8304379885"
    },
     "staging":{
        "host":"10.137.159.54",
        "dbport":"27017",
        "port":"4034",
        "username":"mealdaay",
        "password":"Mealdaay123$",
        "authSource":"admin",
        "userdb":"mealdaay",
        "passworddb":"Mealdaay123$",
        "database":"navedkitchen3",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx"
    },

    "production":{
        "authSource":"admin",
        "userdb":"mealdaay",
        "passworddb":"Mealdaay123$",
        "host":"db.mealdaay.com",
        "dbport":"27017",
        "port":"4034",
        "username":"root",
        "password":"",
        "database":"navedkitchen3",
        "secretkey":"96848-43962-42988-92565",
        "sealpass":"YyjtEzbGFLlpGLbtT0NnykqBAPFyWnSx",
        "instagramaccesstoken":"8304379885.03c8df0.91320964cca845e6bd4bcd9402aa9b74",
        "instagramuserid":"8304379885"
    }
    
};
module.exports = config;