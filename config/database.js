const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

module.exports = db