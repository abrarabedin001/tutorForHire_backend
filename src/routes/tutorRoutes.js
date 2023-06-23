const express = require('express');
const prisma = require('../Database');
const { signup, signin } = require('../controllers/userController');
const { tutorCreate } = require('../controllers/tutorController');
const auth = require('../middlewares/auth');

// const {PrismaClient }= require('@prisma/client')
// const prisma = new PrismaClient()

const tutorRouter = express.Router();
// localhost:3000/users/singin
// functions -> controller

tutorRouter.post('/tutorcreate', auth, tutorCreate);
// tutorRouter.patch('/tutorupdate', auth, tutorCreate);
// tutorRouter.delete('/tutordelete', auth, tutorCreate);

module.exports = tutorRouter;

// async (req,res)=>{
//   let {email,name,password} = req.body()
//   let users = await prisma.user.findMany()
//   res.send(users)
// }
// MVC model-database view-router controller-function
