
const Cart = require("../../models/Cart")
const User = require("../../models/User")

const createCart = async(req, res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        return res.status(200).json(savedCart)
    }catch(err){
        return res.status(500).json(err.message)
    }
}

//Update
const updateCart = async (req,res)=>{
    //Update Others
    try{
        const updatedCart = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedCart)
    }catch(err){
        return res.status(500).json(err.message)
    }
}


//Delete
const delCart = async(req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart Deleted")

    }catch(err){
        res.status(500).json(err.message)
    }
}

//Get User Cart
const getUserCart = async(req, res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err.message)
    }
}

//GET All Cart
const getAllCart = async(req, res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)

    }catch(err){
        res.status(500).jsson(err.message)
    }
}

module.exports = {createCart, updateCart, delCart, getUserCart, getAllCart}

