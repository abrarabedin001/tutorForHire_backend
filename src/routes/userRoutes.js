const express = require("express")

const userRouter = express.Router()

userRouter.get("/signup",(req,res)=>{
  res.send("Signup")
})
userRouter.get("/signin",(req,res)=>{
  res.send("Signin")
})

module.exports = userRouter

