const express = require('express');
const prisma = require('../Database');
const {
  courseEnroll,
  enrolledCourse,
  courseUnenroll,
} = require('../controllers/enrollController');
const auth = require('../middlewares/auth');

const enrollRouter = express.Router();

enrollRouter.post('/enroll', auth, courseEnroll);
enrollRouter.get('/enrolledcourses', auth, enrolledCourse);
enrollRouter.delete('/unenroll/:id1/:id2', auth, courseUnenroll);
module.exports = enrollRouter;
