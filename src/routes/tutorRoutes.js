const express = require('express');
const prisma = require('../Database');
const {
  tutorCreate,
  tutorPatch,
  GetTutors,
  SearchTutor,
} = require('../controllers/tutorController');
const auth = require('../middlewares/auth');

const tutorRouter = express.Router();

tutorRouter.post('/tutorcreate', auth, tutorCreate);
tutorRouter.patch('/tutorupdate', auth, tutorPatch);
tutorRouter.get('/searchtutor/:name', SearchTutor);
tutorRouter.get('/getall', GetTutors);

module.exports = tutorRouter;
