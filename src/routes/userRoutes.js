const express = require('express');
const prisma = require('../Database');
const { signup, signin } = require('../controllers/userController');

// const {PrismaClient }= require('@prisma/client')
// const prisma = new PrismaClient()

const userRouter = express.Router();
// localhost:3000/users/singin
// functions -> controller

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);

module.exports = userRouter;

// async (req,res)=>{
//   let {email,name,password} = req.body()
//   let users = await prisma.user.findMany()
//   res.send(users)
// }
// MVC model-database view-router controller-function
