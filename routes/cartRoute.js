const router = require("express").Router()
const adminVerification = require("../app/providers/token/verifyToken").adminVerification
const tokenAuthentication = require("../app/providers/token/verifyToken").tokenAuthenticaton
const Cart= require("../app/https/request/cartRequest")

router.post("/",tokenAuthentication, Cart.createCart)
router.put("/:id", tokenAuthentication, Cart.updateCart)
router.delete("/:id", tokenAuthentication, Cart.delCart)
router.get("/find/:id", tokenAuthentication, Cart.getUserCart)
router.get("/", adminVerification, Cart.getAllCart)


module.exports = router