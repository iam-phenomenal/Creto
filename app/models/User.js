const mongoose = require("mongoose")

const UserSchema =  new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    isSeller: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)