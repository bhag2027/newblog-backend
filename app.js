const express=require("express")
const mongoose=require("mongoose")
const cors=require( "cors")
const bcrypt=require("bcryptjs")
const jwt=require( "jsonwebtoken")
const usermodel=require("./models/user")


const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://bhagya:bhagya20@cluster0.gszky.mongodb.net/newblogdb?retryWrites=true&w=majority&appName=Cluster0")

app.get("/signup",async(req,res)=>{
    let input=req.body
    let hashedpassword=bcrypt.hashSync(req.body. password,10)
    req.body.password=hashedpassword
    console.log(input)
    usermodel.find({email:req.body.email}).then(
        (items)=>{
            if(items.length>0){
                res.json({"status":"emailid already exit"})
               }
               else {
        
                let result=new usermodel(input)
                result.save()
                res.json({"status":"success"})
        
               }

        }
    ).catch(
        (error)=>{}
    )
    
})


app.listen(3030,()=>{
    console.log("server started")
})