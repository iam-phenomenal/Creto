const jwt = require("jsonwebtoken")

exports.signToken = ()=>{
    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller
    }, process.env.JWT_SEC, {expiresIn: "1d"})
    return accessToken
}

exports.tokenResult = (req, res, next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) =>{
            if(err){
               return res.status(403).json("Invalid Token")
            }
            req.user = user
            next()
        })
    }else{
        return res.status(403).json("Not Authenticated!")
    }
} 

exports.tokenAuthenticaton = (req, res, next) =>{
    this.tokenResult(req, res, ()=>{
        if(req.user.id === req.params.id){
            next()
        }else{
           return res.status(403).json("Permission Denied!")
        }
    })
}

exports.adminVerification = (req, res, next) => {
    this.tokenResult(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
           return res.status(401).json("Permission Denied!")
        }
    })
}

exports.sellersAndAdminVerification = (req, res, next) =>{
    this.tokenResult(req, res, ()=>{
        if(req.user.isAdmin || req.user.isSeller){
            next()
        }else{
           return res.status(401).json("Permission Denied")
        }
    })
}
