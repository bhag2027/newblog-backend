const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        name:String,
        phno:String,
        email:String,
        password:String
    }
)

let usermodel=mongoose.model("Users",schema)
module.exports=usermodel