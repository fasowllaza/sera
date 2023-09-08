const bcrypt = require("bcryptjs")

function encode (password) {
    const salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(password, salt)
}

function decode(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {encode, decode}