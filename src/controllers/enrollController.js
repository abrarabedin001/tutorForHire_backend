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
  console.log('endroll user');
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
  console.log('Enroll is working');
  try {
    const enrolledCourses = await prisma.courseEnroll.findMany({
      where: {
        studentProfileId: user.StudentProfile.id,
      },
      include: {
        Course: true,
      },
    });
    console.log(enrolledCourses);
    res.status(201).json({ enrolledCourses: enrolledCourses });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const courseUnenroll = async (req, res) => {
  let { id1, id2 } = req.params;

  try {
    console.log(id1, id2);
    // console.log(req.user.id);
    console.log('course unenroll');
    let user = await prisma.user.findUnique({
      where: { id: id2 },
      include: { StudentProfile: true },
    });
    console.log(user);
    const deletedCourseEnroll = await prisma.courseEnroll.deleteMany({
      where: {
        courseId: id1,
        studentProfileId: user.StudentProfile.id,
      },
    });
    console.log(deletedCourseEnroll);
    res.status(204);
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};


// use kickout button
const studentKickout = async (req, res) => {
 
  const{courseid,studentProfileId}=req.body;
  
  try {
    console.log("dhur hoi na ken")
  // Find the teacher's profile based on the authenticated userId.
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: {
      userId: req.user.id,
    },
  });

  console.log(req.user,teacherProfile)

  // Find the course created by the teacher and verify its ownership.
  const findcourse = await prisma.course.findFirst({
    where: {
      AND: [
      {
        id: courseid
      },
      {
        teacherProfileId: teacherProfile.id
      }
    ],
    },
  });
  console.log(findcourse)
  // Now, delete the student enrollment.
  const kickout=await prisma.courseEnroll.deleteMany({
    where: {
      AND: [
        {
          courseId: findcourse.id
        },
        {
          studentProfileId: studentProfileId
        }
      ],
    },
  });
  console.log(kickout)

    res.status(201).json({ kickout: kickout });
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong.', error: err });
  }
};


//students who enroll

const enrolledStudents = async (req, res) => {
  const{courseid}=req.body;
  try {
    console.log("thik hae vai")
    // Find the teacher's profile based on the authenticated userId.
    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    console.log(req.user,teacherProfile)

    // Find the course created by the teacher and verify its ownership.
    const checkcourse = await prisma.course.findFirst({
      where: {
        AND: [
        {
          id: courseid
        },
        {
          teacherProfileId: teacherProfile.id
        }
      ],
      },
    });

    // Now, delete the student enrollment.
    const allstudents=await prisma.courseEnroll.findMany({
      where: {
        courseId: checkcourse.id,
      },
    });
    console.log(allstudents)
    res.status(201).json({ message: allstudents });
  }catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};




module.exports = { courseEnroll, studentKickout,enrolledCourse, courseUnenroll, enrolledStudents };
