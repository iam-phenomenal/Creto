const router = require("express").Router()
const sellersAndAdminVerification = require("../app/providers/token/verifyToken").sellersAndAdminVerification
const Product = require("../app/https/request/productRequest")

router.post("/:id",sellersAndAdminVerification, Product.createProduct)
router.put("/:id", sellersAndAdminVerification, Product.updateProduct)
router.delete("/:id", sellersAndAdminVerification, Product.delProduct)
router.get("/find/:id", Product.getProduct)
router.get("/", Product.getAllProduct)

module.exports = router