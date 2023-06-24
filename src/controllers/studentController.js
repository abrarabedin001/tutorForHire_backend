const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

// localhost:3000/student/:id

const create = async (req, res) => {
  console.log(req.user);
  // res.status(200).json({ message: req.userId });

  let { bio, education } = req.body;
  try {
    let studentProfile = await prisma.studentProfile.create({
      data: { bio: bio, education: education, userId: req.user.id },
    });

    res.status(201).json({ studentProfile: studentProfile });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = { create };
