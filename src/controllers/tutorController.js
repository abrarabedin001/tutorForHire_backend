const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

// localhost:3000/student/:id

const tutorCreate = async (req, res) => {
  let { bio, education } = req.body;
  try {
    let teacherProfile = await prisma.teacherProfile.create({
      data: { bio: bio, education: education, userId: req.userId },
    });

    res.status(201).json({ teacherProfile: teacherProfile });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = { tutorCreate };
