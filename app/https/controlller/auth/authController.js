const {validationResult} = require("express-validator")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const User = require("../../../models/User")
require("dotenv").config()

const registerController = async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    const customer = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        isSeller: req.body.isSeller, 
        password: encryptedPassword
    })
    try{
        const newCustomer = await customer.save()

        return res.status(201).json(newCustomer)
    }catch(err){
        return res.status(500).json(err.message)
    }
}

const loginController = async (req, res)=> {
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(401).json("Invalid Credentials")
        }
        userPassword =CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
        if(req.body.password != userPassword){
            console.log(req.body.password, user.password)
            return res.status(401).json("Invalid Credentials")
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller
        }, process.env.JWT_SEC, {expiresIn: "1d"})
        const {password, ...others} = user._doc
        return res.status(200).json({...others, password, accessToken})
    }catch(err){
        return res.status(500).json(err.message)
    }
}

module.exports = {registerController, loginController}