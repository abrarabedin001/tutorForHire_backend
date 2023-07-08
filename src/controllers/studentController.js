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
  let { password, bio, education } = req.body;
  console.log(req.user.id);
  //   console.log(req.user.password)
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateStudent = await prisma.studentProfile.update({
      where: {
        userId: req.user.id,
      },
      data: {
        user: {
          update: {
            password: hashedPassword,
          },
        },
        bio: bio,
        education: education,
      },
    });
    console.log(updateStudent);
    console.log(password);
    res.status(201).json({ updateStudent: updateStudent });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//not done yet
const Delete = async (req, res) => {
  let { bio, education } = req.body;
  try {
    const deleteStudent = await prisma.studentProfile.delete({
      where:
        OR[
          ({
            userId: req.user.id,
          },
          {
            email: req.user.email,
          })
        ],
      data: {
        bio: bio,
        education: education,
      },
    });
    res.status(201).json({ deleteStudent: deleteStudent });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = { create, update, Delete };
