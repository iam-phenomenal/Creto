const { check } = require("express-validator")
const User = require("../../models/User")

function registerValidation(){
    const inputValidation = [
        check("username").isString().custom(async value => {
            const user = await User.findOne({username: value})
            if(user){
                throw new Error("User Already Exists")
            }
            return true;
        }),
        check("firstname").not().isEmpty().withMessage("First name is required"),
        check("lastname").isString().withMessage(""),
        check("email").isEmail().custom(async value => {
            const user = await User.findOne({email: value})
            if(user){
                throw new Error("User Already Exists")
            }
            return true;
        }),
        check("password").isLength({min: 8}).withMessage("Minimum of 8 characters").isAlphanumeric().withMessage("must be alphanumeric Characters"),
        check("passwordConfirmation").custom((value, {req})=> {
            if(value !== req.body.password){
                throw new Error("Password confirmation doesn't match")
            }
            return true
        }) 
    ]
    return inputValidation
}

module.exports = registerValidation