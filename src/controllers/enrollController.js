const { all } = require('axios');
const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const courseEnroll = async (req, res) => {
  let { courseId } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { StudentProfile: true },
    });
    console.log(user);
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
      include: {
        Course: true,
      },
    });

    res.status(201).json({ enrolledCourses: enrolledCourses });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const courseUnenroll = async (req, res) => {
  let { id1 } = req.params;
  let user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { StudentProfile: true },
  });

  const deletedCourseEnroll = await prisma.courseEnroll.deleteMany({
    where: {
      courseId: id1,
      studentProfileId: user.StudentProfile.id,
    },
  });

  res.status(204);

  try {
    // let user = await prisma.user.findUnique({
    //   where: { id: id2 },
    //   include: { StudentProfile: true },
    // });
    // const deletedCourseEnroll = await prisma.courseEnroll.deleteMany({
    //   where: {
    //     courseId: id1,
    //     studentProfileId: user.StudentProfile.id,
    //   },
    // });
    // res.status(204);
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

// use kickout button
const studentKickout = async (req, res) => {
  const { id1, id2 } = req.params;

  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: {
      userId: req.user.id,
    },
  });

  // Find the course created by the teacher and verify its ownership.
  const findcourse = await prisma.course.findFirst({
    where: {
      AND: [
        {
          id: id1,
        },
        {
          teacherProfileId: teacherProfile.id,
        },
      ],
    },
  });

  // Now, delete the student enrollment.
  const kickout = await prisma.courseEnroll.deleteMany({
    where: {
      AND: [
        {
          courseId: findcourse.id,
        },
        {
          studentProfileId: id2,
        },
      ],
    },
  });

  res.status(201).json({ kickout: kickout });

  try {
    // Find the teacher's profile based on the authenticated userId.
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong.', error: err });
  }
};

//
//students who enroll

const enrolledStudents = async (req, res) => {
  let { id1 } = req.params;

  const checkcourse = await prisma.course.findFirst({
    where: {
      id: id1,
    },
  });

  // Now, delete the student enrollment.
  const allstudents = await prisma.courseEnroll.findMany({
    where: {
      courseId: checkcourse.id,
    },
    include: { StudentProfile: { include: { user: true } } },
  });

  res.status(201).json({ message: allstudents });
  try {
    // Find the course created by the teacher and verify its ownership.
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = {
  courseEnroll,
  studentKickout,
  enrolledCourse,
  courseUnenroll,
  enrolledStudents,
};
