const bcrypt = require("bcryptjs")

function encode (password:any) {
    const salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(password, salt)
}

function decode(password:any, hashPassword:any){
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {encode, decode}