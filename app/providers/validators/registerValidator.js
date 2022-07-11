const { body } = require("express-validator")
const User = require("../../models/User")

function validationTerms(){
    const registrationValidator = [
        body("username").isString().custom(async value => {
            const user = await User.findOne({username: value})
            if(user){
                throw new Error("User Already Exists")
            }
            return true;
        }),
        body("firstname").not().isEmpty().withMessage("First name is required"),
        body("lastname").isString().withMessage(""),
        body("email").isEmail().custom(async value => {
            const user = await User.findOne({email: value})
            if(user){
                throw new Error("User Already Exists")
            }
            return true;
        }),
        body("password").isLength({min: 8}).not().isAlphanumeric().withMessage("min of 8 Alphanumeric Characters"),
        body("passwordConfirmation").custom((value, {req})=> {
            if(value !== req.body.password){
                throw new Error("Password confirmation doesn't match")
            }
            return true
        })
    
    ]
    return registrationValidator
}

module.exports = validationTerms()