const express = require('express');
const prisma = require('../Database');
const { create, signin } = require('../controllers/studentController');
const auth = require('../middlewares/auth');

const studentRouter = express.Router();

studentRouter.post('/create', auth, create);
studentRouter.post('/update', auth, create);
studentRouter.post('/delete', auth, create);

module.exports = studentRouter;
