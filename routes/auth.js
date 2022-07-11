const router = require("express").Router()
const User = require("../app/models/User")
const {registerController, loginController} = require("../app/https/controlller/auth/authController")
const {body} = require("express-validator")
// const registerValidate = require("../app/providers/validators/registerValidator")


router.post("/register",
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
body("password").isLength({min: 8}).withMessage("Minimum of 8 characters").isAlphanumeric().withMessage("must be alphanumeric Characters"),
body("passwordConfirmation").custom((value, {req})=> {
    if(value !== req.body.password){
        throw new Error("Password confirmation doesn't match")
    }
    return true
}) ,registerController)


router.post("/login", loginController)

module.exports = router