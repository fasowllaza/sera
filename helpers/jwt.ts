const jwt = require("jsonwebtoken")

function sign(payload:any){
    return jwt.sign(payload, "dans")
}

function verify(token:any){
    return jwt.verify(token, "dans")
}

module.exports = {sign, verify}