const express = require('express');
const prisma = require('../Database');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  tutorCreate,
  tutorCreate2,
  tutorPatch,
  GetTutors,
  SearchTutor,
  GetProfile,
} = require('../controllers/tutorController');
const auth = require('../middlewares/auth');

const tutorRouter = express.Router();

tutorRouter.post('/tutorcreate', auth, tutorCreate);
tutorRouter.post('/tutorcreate2', [auth, upload.single('image')], tutorCreate2);
tutorRouter.patch('/tutorupdate', auth, tutorPatch);
tutorRouter.get('/searchtutor/:name', SearchTutor);
tutorRouter.get('/getall', GetTutors);
tutorRouter.get('/getprofile', auth, GetProfile);
// getprofile
module.exports = tutorRouter;
