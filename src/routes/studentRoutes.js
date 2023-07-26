const express = require('express');
const prisma = require('../Database');
const {
  create,
  update,
  GetProfile,
} = require('../controllers/studentController');
const auth = require('../middlewares/auth');

const studentRouter = express.Router();

studentRouter.post('/create', auth, create);
studentRouter.patch('/studentupdate', auth, update);
studentRouter.get('/getprofile', auth, GetProfile);

module.exports = studentRouter;
