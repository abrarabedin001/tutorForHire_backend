const express = require("express")
const userRouter = require("./routes/userRoutes")
const app = express()

app.use(express.json());
app.use("/users",userRouter)

app.get("/",(req,res)=>{
  res.status(200).send("Hello")
})

app.listen(5000,()=>{
  console.log(
    "Server started on port no:5000"
  )
})