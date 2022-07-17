const router = require("express").Router()
const {registerRequest, loginRequest} = require("../app/https/request/authRequest")
const registerValTerms = require("../app/providers/validators/registerValidator")
const loginValTerms = require("../app/providers/validators/loginValidator")


router.post("/register", registerValTerms() , registerRequest)
router.post("/login", loginValTerms(), loginRequest)


module.exports = router