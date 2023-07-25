const express = require('express');
const prisma = require('../Database');

const {giveRating, seeRating} = require('../controllers/ratingController');
const auth = require('../middlewares/auth');
const ratingRouter = express.Router();

ratingRouter.post('/giverating', auth, giveRating);
ratingRouter.get('/seerating/:id1',seeRating);
module.exports = ratingRouter;
