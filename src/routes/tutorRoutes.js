const express = require('express');
const prisma = require('../Database');
const { tutorCreate,tutorPatch,tutorDelete } = require('../controllers/tutorController');
const auth = require('../middlewares/auth');


const tutorRouter = express.Router();

tutorRouter.post('/tutorcreate', auth, tutorCreate);
tutorRouter.patch('/tutorupdate', auth, tutorPatch);
tutorRouter.delete('/tutordelete', auth, tutorDelete);

module.exports = tutorRouter;