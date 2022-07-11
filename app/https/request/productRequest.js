
const Product = require("../../models/Product")
const User = require("../../models/User")


//Create
const createProduct = async (req, res)=>{
    try{
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        
        return res.status(200).json(savedProduct)
    }catch(err){
        return res.status(500).json(err.message)
    }
}

//Update
const updateProduct = async (req,res)=>{
    //Update Others
    try{
        const updatedProduct = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedProduct)
    }catch(err){
        return res.status(500).json(err.message)
    }
}


//Delete
const delProduct = async(req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json("Product Deleted")

    }catch(err){
        return res.status(500).json(err.message)
    }
}

//Get Product
const getProduct = async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        const {password, ...others} = product._doc
        return res.status(200).json(others)
    }catch(err){
        return res.status(500).json(err.message)
    }
}

//GET All Products
const getAllProduct = async (req, res)=>{
    const qNew = req.query.new
    const qCategory = req.query.category
    try{
        let products
       if(qNew){
        products = await Product.find().sort({createdAt: -1}).limit(5)
       }else if(qCategory){
        products = await Product.find({
            catergories: {
                $in: [qCategory]
            }
        })
       }
       else{
        products = await Product.find()
       }
       return res.status(200).json(products)
    }catch(err){
        return res.status(500).json(err.message)
    }
}

module.exports = {createProduct, updateProduct, delProduct, getProduct, getAllProduct}