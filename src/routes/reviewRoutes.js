const express = require('express');
const prisma = require('../Database');

const {giveReview, seeReview} = require('../controllers/reviewController');
const auth = require('../middlewares/auth');
const reviewRouter = express.Router();

reviewRouter.post('/givereview', auth, giveReview);
reviewRouter.get('/seereview/:id1',seeReview);
module.exports = reviewRouter;
