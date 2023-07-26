const express = require('express');
const prisma = require('../Database');
const {
  tutorCreate,
  tutorPatch,
  GetProfile,
} = require('../controllers/tutorController');
const auth = require('../middlewares/auth');

const tutorRouter = express.Router();

tutorRouter.post('/tutorcreate', auth, tutorCreate);
tutorRouter.patch('/tutorupdate', auth, tutorPatch);
tutorRouter.get('/getprofile', auth, GetProfile);

module.exports = tutorRouter;
