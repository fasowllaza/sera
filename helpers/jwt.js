const jwt = require("jsonwebtoken")

function sign(payload){
    return jwt.sign(payload, "dans")
}

function verify(token){
    return jwt.verify(token, "dans")
}

module.exports = {sign, verify}