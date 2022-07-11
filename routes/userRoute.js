const router = require("express").Router()
const tokenAuthentication = require("../app/providers/token/verifyToken").tokenAuthenticaton
const adminVerification = require("../app/providers/token/verifyToken").adminVerification
const {updateUser, delUser, getUser, getAllUser, getStats} = require("../app/https/request/userRequest")


router.put("/:id", tokenAuthentication, updateUser)
router.delete("/:id", tokenAuthentication, delUser)
router.get("/find/:id", adminVerification, getUser)
router.get("/", adminVerification, getAllUser)
router.get("/stats", adminVerification, getStats)


module.exports = router