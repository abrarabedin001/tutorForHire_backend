const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/enrollRoutes');
const SECRET_KEY = 'skldjfa;lsdj';


const giveChat = async (req, res) => {
    let { userId, courseId, chat } = req.body;


    try {
      const postChat = await prisma.chat.create({
        data: {
          courseId:courseId,
          userId:userId,
          chat:chat
        },
      });
      console.log(postChat);
    res.status(201).json({ postChat: postChat });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const seeChat = async (req, res) => {
  let { id1 } = req.params;
  try {
    const showChat= await prisma.chat.findMany({
      where: {
        courseId: id1,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    console.log(showChat);
    res.status(201).json({ showChat:showChat });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = { seeChat, giveChat};
