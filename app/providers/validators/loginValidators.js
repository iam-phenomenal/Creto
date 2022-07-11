const {body} = require("express-validator")
const {Customers, Sellers, Admins} = require("../../models/User")

const customervalidate = [
    body("username").isString().custom(async value =>{
        const user = await Customers.findOne({where: {username: value}})
        if(!user){
            throw new Error("User Already Exists")
        }
        return true;
    }),
    body("firstname").isString(),
    body("lastname").isString(),
    body("email").isEmail.isString().custom(async value=> {
        const user = await Customers.findOne({where: {email: value}})
        if(!user){
            throw new Error("User Already Exists")
        }
        return true;
    }),
    body("password").isLength({min: 8}).isAlphanumeric()

]