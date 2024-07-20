const mongoose=require("mongoose")
const postschema=mongoose.Schema(
    {
        "userid":{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        "message":String,
        "posteddate":{
            type:Date,
            default:Date.now
        }
    }
)

let postmodel=mongoose.model("posts",postschema)
module.exports=postmodel