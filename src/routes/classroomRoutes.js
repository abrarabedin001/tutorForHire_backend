const express = require('express');
const prisma = require('../Database');

const {
  createQues,
  createAns,
  getQues,
  postFeedback,
  getAnswers,
} = require('../controllers/classroomController');
const auth = require('../middlewares/auth');
const classroomRouter = express.Router();

classroomRouter.post('/createques', auth, createQues);
classroomRouter.get('/getques/:courseId', auth, getQues);
classroomRouter.post('/createans', auth, createAns);
classroomRouter.patch('/feedback', auth, postFeedback);
classroomRouter.get('/getanswer/:quesId', auth, getAnswers);

// reviewRouter.get('/seechat/:id1', seeChat);
module.exports = classroomRouter;
