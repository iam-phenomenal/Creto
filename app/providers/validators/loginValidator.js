const {check} = require("express-validator")

function validationTerms(){
    const customervalidate = [
        check("username").isString(),
        check("email").isEmail().isString(),
        check("password").isLength({min: 8}).isAlphanumeric()
    ]
    return customervalidate
}

module.exports = validationTerms