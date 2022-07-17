const { urlencoded } = require("express")
const express = require("express")
const authRoute = require("../routes/authRoute")
const userRoute = require("../routes/userRoute")
const productRoute = require("../routes/productRoute")
const cartRoute = require("../routes/cartRoute")
// const orderRoute = require("../routes/orderRoute")
const db = require("./database")


module.exports = function(){
    const app = express()
    db.on("error", (error) => console.error(error))
    db.once("open", ()=>console.log("Connected to Database"))

    app.use(express.json())
    app.use(urlencoded({extended: true}))
    app.use("/auth", authRoute)
    app.use("/user", userRoute)
    app.use("/product", productRoute)
    app.use("/cart", cartRoute)
    // app.use("/order", orderRoute)

    return app
}