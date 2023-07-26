const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

// localhost:3000/student/:id

const create = async (req, res) => {
  console.log('New Student');
  console.log(req.user);
  console.log(req.body);
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

const update = async (req, res) => {
  let { bio, education } = req.body;
  console.log(req.user.id);
  //   console.log(req.user.password)
  try {
    const updateStudent = await prisma.studentProfile.update({
      where: {
        userId: req.user.id,
      },
      data: {
        bio: bio,
        education: education,
      },
    });

    res.status(201).json({ updateStudent: updateStudent });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//not done yet
const GetProfile = async (req, res) => {
  try {
    const profile = await prisma.studentProfile.findFirst({
      where: {
        userId: req.user.id,
      },
    });
    res.status(201).json({ data: profile });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = { create, update, GetProfile };
