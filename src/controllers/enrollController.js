const { all } = require('axios');
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

  let course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  let today = new Date();
  console.log(course.startDate, today);

  if (course.startDate > today) {
    console.log('choto');

    try {
      // Check if there are available seats
      if (course.seatStatus > 0) {
        const courseEnrollment = await prisma.courseEnroll.create({
          data: {
            studentProfileId: user.StudentProfile.id,
            courseId: courseId,
          },
        });

        // Decrement the seat status count
        await prisma.course.update({
          where: {
            id: courseId,
          },
          data: {
            seatStatus: {
              decrement: 1,
            },
          },
        });

        res.status(201).json({ courseEnrollment: courseEnrollment });
      } else {
        res.status(500).json({ message: 'No available seats for this course' });
      }
    } catch (err) {
      res.status(404).json({ message: 'something went wrong', error: err });
    }
  } else {
    res.status(400).json({ message: 'cannot enroll after course start date' });
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
        Course: { include: { TeacherProfile: {include:{user:true}} } },
      },
    });

    res.status(201).json({ enrolledCourses: enrolledCourses });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const courseUnenroll = async (req, res) => {
  console.log('asdfasdfasdf');
  let { id1, id2 } = req.params;
  let course = await prisma.course.findUnique({
    where: {
      id: id1,
    },
  });

  let today = new Date();
  console.log(course.startDate, today);

  if (course.startDate > today) {
    console.log('bye');
    let user = await prisma.user.findUnique({
      where: { id: id2 },
      include: { StudentProfile: true },
    });

    const deletedCourseEnroll = await prisma.courseEnroll.deleteMany({
      where: {
        courseId: id1,
        studentProfileId: user.StudentProfile.id,
      },
    });

    // Increment the seat status count
    await prisma.course.update({
      where: {
        id: id1,
      },
      data: {
        seatStatus: {
          increment: 1,
        },
      },
    });

    res.status(201).send();
    try {
    } catch (err) {
      res.status(404).json({ message: 'something went wrong', error: err });
    }
  } else {
    res
      .status(400)
      .json({ message: 'cannot unenroll after course start date' });
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

  // Increment the seat status count
  await prisma.course.update({
    where: {
      id: id1,
    },
    data: {
      seatStatus: {
        increment: 1,
      },
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

//newly made
const paid = async (req, res) => {
  let { courseId, paid } = req.body;
  let user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { StudentProfile: true },
  });

  try {
    const coursepay = await prisma.courseEnroll.update({
      where: {
        courseId_studentProfileId: {
          studentProfileId: user.StudentProfile.id,
          courseId: courseId,
        },
      },
      data: {
        paid: paid,
      },
    });

    res.status(201).json({ coursepay: coursepay });
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
  paid,
};
