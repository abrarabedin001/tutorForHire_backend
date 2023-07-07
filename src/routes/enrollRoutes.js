const express = require('express');
const prisma = require('../Database');
const { courseEnroll,enrolledCourse,courseUnenroll}  = require('../controllers/enrollController');
const auth = require('../middlewares/auth');


const enrollRouter = express.Router();

enrollRouter.post('/enroll',courseEnroll)
enrollRouter.get('/enrolledcourses',enrolledCourse)
enrollRouter.delete('/unenroll',courseUnenroll)
module.exports = enrollRouter;