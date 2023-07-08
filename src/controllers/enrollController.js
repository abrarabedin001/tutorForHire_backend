const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const courseEnroll = async (req, res) => {
  let { courseId } = req.body;
  let user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { StudentProfile: true },
  });
  try {
    const courseEnrollment = await prisma.courseEnroll.create({
      data: {
        studentProfileId: user.StudentProfile.id,
        courseId: courseId,
      },
    });

    res.status(201).json({ courseEnrollment: courseEnrollment });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const enrolledCourse = async (req, res) => {
  let user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { StudentProfile: true },
  });
  try {
    const enrolledCourses = await prisma.courseEnroll.findMany({
      where: {
        studentProfileId: user.StudentProfile.id,
      },
    });
    console.log(enrolledCourses);
    res.status(201).json({ enrolledCourses: enrolledCourses });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const courseUnenroll = async (req, res) => {
  let { id } = req.body;
  try {
    const deletedCourseEnroll = await prisma.courseEnroll.deleteMany({
      where: {
        id: id,
      },
    });
    res.status(201).json({ deletedCourseEnroll: deletedCourseEnroll });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = { courseEnroll, enrolledCourse, courseUnenroll };
