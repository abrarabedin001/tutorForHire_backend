const express = require('express');
const prisma = require('../Database');
const {
  courseEnroll,
  enrolledCourse,
  courseUnenroll,
  studentKickout,
  enrolledStudents,
} = require('../controllers/enrollController');
const auth = require('../middlewares/auth');

const enrollRouter = express.Router();

enrollRouter.post('/enroll', auth, courseEnroll);
enrollRouter.get('/enrolledcourses', auth, enrolledCourse);
enrollRouter.get('/enrolledstudents/:id1', auth, enrolledStudents);
enrollRouter.delete('/unenroll/:id1', auth, courseUnenroll);
enrollRouter.delete('/kickout/:id1/:id2', auth, studentKickout);
module.exports = enrollRouter;
