const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

// localhost:3000/student/:id

const tutorCreate = async (req, res) => {
  let { bio, education } = req.body;
  try {
    let teacherProfile = await prisma.teacherProfile.create({
      data: { bio: bio, education: education, userId: req.user.id },
    });

    res.status(201).json({ teacherProfile: teacherProfile });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const tutorPatch = async (req, res) => {
  let { password, bio, education } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const updateTeacher = await prisma.teacherProfile.update({
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
    console.log(req.user.id);
    console.log(updateTeacher);
    console.log(password);
    res.status(201).json({ updateTeacher: updateTeacher });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};
//

//not done yet
const tutorDelete = async (req, res) => {
  let { bio, education } = req.body;
  try {
    const deleteTeacher = await prisma.teacherProfile.delete({
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
    res.status(201).json({ deleteTeacher: deleteTeacher });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//

module.exports = { tutorCreate, tutorPatch, tutorDelete };
