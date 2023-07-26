const express = require('express');
const prisma = require('../Database');

const {seeTotalRating,showRatingReview, giveRatingReview} = require('../controllers/ratingReviewController');
const auth = require('../middlewares/auth');
const ratingRouter = express.Router();

ratingRouter.post('/giveratingreview', auth, giveRatingReview);
ratingRouter.get('/seetotalrating/:id1',seeTotalRating);
ratingRouter.get('/showratingreview/:id1',showRatingReview);
module.exports = ratingRouter;
