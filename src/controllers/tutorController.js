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
  let { bio, education } = req.body;

  const updateTeacher = await prisma.teacherProfile.update({
    where: {
      userId: req.user.id,
    },
    data: {
      bio: bio,
      education: education,
    },
  });

  res.status(201).json({ updateTeacher: updateTeacher });

  try {
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};
//

//not done yet

const GetTutors = async (req, res) => {
  let { id } = req.params;
  try {
    const courses = await prisma.teacherProfile.findMany({
      include: { user: true },
    });

    res.status(201).json({ data: courses });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const SearchTutor = async (req, res) => {
  let { name } = req.params;

  try {
    const profile = await prisma.course.findMany({
      where: {
        teacherProfileId: name,
      },
    });

    res.status(201).json({ data: profile });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//

module.exports = { tutorCreate, tutorPatch, GetTutors, SearchTutor };
