const express = require('express');
const prisma = require('../Database');
const { create, update,Delete } = require('../controllers/studentController');
const auth = require('../middlewares/auth');

const studentRouter = express.Router();

studentRouter.post('/create', auth, create);
studentRouter.patch('/update', auth, update);
studentRouter.delete('/delete', auth, Delete);

module.exports = studentRouter;
