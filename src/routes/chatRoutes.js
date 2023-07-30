const express = require('express');
const prisma = require('../Database');

const { giveChat, seeChat } = require('../controllers/chatController');
const auth = require('../middlewares/auth');
const reviewRouter = express.Router();

reviewRouter.post('/givechat', auth, giveChat);
reviewRouter.get('/seechat/:id1', seeChat);
module.exports = reviewRouter;
