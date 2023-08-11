const express = require('express');
const prisma = require('../Database');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
const {
  createQues,
  createAns,
  getQues,
  postFeedback,
  getAnswers,
} = require('../controllers/classroomController');
const auth = require('../middlewares/auth');
const classroomRouter = express.Router();

classroomRouter.post('/createques', [auth, upload.single('files')], createQues);
classroomRouter.get('/getques/:courseId', auth, getQues);
classroomRouter.post('/createans', [auth, upload.single('files')], createAns);
classroomRouter.patch('/feedback', auth, postFeedback);
classroomRouter.get('/getanswer/:quesId', auth, getAnswers);

// reviewRouter.get('/seechat/:id1', seeChat);
module.exports = classroomRouter;
