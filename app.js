const express=require("express")
const mongoose=require("mongoose")
const cors=require( "cors")

const app=express()

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(3030,()=>{
    console.log("server started")
})