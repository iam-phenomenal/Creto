const app = require("./config/express")()


app.listen(3000, ()=>{
    try{
        console.log("Server Running")
    }catch(err){
        console.log(err.message)
    }
})