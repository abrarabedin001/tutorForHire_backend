const express = require('express');
const prisma = require('../Database');
const { signup, signin, showProfile} = require('../controllers/userController');
const auth = require('../middlewares/auth');
// const {PrismaClient }= require('@prisma/client')
// const prisma = new PrismaClient()

const userRouter = express.Router();
const tutorRouter = express.Router();
// localhost:3000/users/singin
// functions -> controller

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.get('/showprofile',auth,showProfile);

module.exports = userRouter;

// async (req,res)=>{
//   let {email,name,password} = req.body()
//   let users = await prisma.user.findMany()
//   res.send(users)
// }
// MVC model-database view-router controller-function
