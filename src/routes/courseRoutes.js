// get all courses by single creator
// get all courses by all creators
// create a courses
// delete a courses
// update a courses


const express = require('express');
const prisma = require('../Database');
const { courseGet,coursePost}  = require('../controllers/courseController');
const auth = require('../middlewares/auth');

const courseRouter = express.Router();
courseRouter.get('/courseget',courseGet)
// courseRouter.patch('/courseupdate',coursePatch)
// courseRouter.delete('/coursedelete',courseDelete)
courseRouter.post('/coursepost',coursePost)


module.exports = courseRouter;
