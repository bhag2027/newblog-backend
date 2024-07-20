const express=require("express")
const mongoose=require("mongoose")
const cors=require( "cors")
const bcrypt=require("bcryptjs")
const jwt=require( "jsonwebtoken")
const usermodel=require("./models/user")
const postmodel = require("./models/posts")


const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://bhagya:bhagya20@cluster0.gszky.mongodb.net/newblogdb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/signin",async(req,res)=>{
    let input=req.body
    let result=usermodel.find({ email:req.body.email}).then(
        (items)=>{
            if (items.length>0) {
                const passwordvalidator=bcrypt.compareSync(req.body.password,items[0].password)
                if (passwordvalidator) {
                    jwt.sign({email:req.body.email},"blogapp",{expiresIn:"1d"},
                    (error,token)=>{
                   if (error) {
                    res.json({"status":"error","error":error})
                   } 
                   else {
                    res.json({"status":"success","token":token,"userid":items[0]._id})
                   }
                    })
                } else {
                    res.json({"status":"invalid password"})
                    
                }
            } else {
                res.json({"status":"invalid email"})
                
            }
        }
    ).catch()
})







app.post("/signup",async(req,res)=>{
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


app.post("/add",async(req,res)=>{
    let input=req.body
    let token=req.headers.token
    jwt.verify(token,"blogapp",async(error,decoded)=>{
        if (decoded) {
            let result=new postmodel(input)
            await result.save()
        } else {
            res.json({"status":"invalid authentication"})
        }
    })
})


app.post("/viewall",(req,res)=>{
    let token=req.headers.token
    jwt.verify(token,"blogapp",(error,decoded)=>{
        if (decoded) {
            postmodel.find().then(
                (items)=>{
                    res.json(items)
                }
            ).catch(
                (error)=>{
                    res.json({"status":"error"})
                }
            )
        } else {
            res.json({"status":"invalid authentication"})
        }
    })
})










app.listen(3030,()=>{
    console.log("server started")
})