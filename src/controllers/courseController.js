const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';
//
//course insert or create
const coursePost = async (req, res) => {
  try {
    let {
      title,
      description,
      seatStatus,
      address,
      cost,
      startDate,
      endDate,
      categories,
      teacherProfileId,
    } = req.body;
    title=title.toLowerCase();
    categories=categories.toLowerCase()
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let courseCreate = await prisma.course.create({
      data: {
        title: title,
        description: description,
        seatStatus: seatStatus,
        address: address,
        cost: cost,
        startDate: startDate,
        endDate: endDate,
        categories: categories,
        TeacherProfile: {
          connect: {
            userId: teacherProfileId,
          },
        },
      },
    });

    res.status(201).json({ courseCreate: courseCreate });
    console.log(courseCreate);
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//search using categories
const courseSearch = async (req, res) => {
  let { query } = req.params;
  const lowercaseQuery = query.toLowerCase();

  try {
    let coursedetails = await prisma.course.findMany({
      where: {
        OR: [
          {
            title: {
              contains: lowercaseQuery,
            },
          },
          {
            categories: {
              contains: lowercaseQuery,
            },
          },
        ],
      },
      include: {
        TeacherProfile: { include: { user: true } },
        CourseEnroll: {
          include: { StudentProfile: { include: { user: true } } },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(201).json({ coursedetails: coursedetails });
    console.log(coursedetails)
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//for all courses page
const courseGet = async (req, res) => {
  try {
    let courseshow = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        TeacherProfile: { include: { user: true } },
        CourseEnroll: {
          include: { StudentProfile: { include: { user: true } } },
        },
      },
    });

    res.status(201).json({ courseshow: courseshow });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};
//for single teacher
const courseGetPersonal = async (req, res) => {
  try {
    let { id } = req.params;
    let courseshow = await prisma.course.findMany({
      where: {
        TeacherProfile: {
          is: {
            userId: id,
          },
        },
      },
      include: {
        TeacherProfile: { include: { user: true } },
        CourseEnroll: {
          include: { StudentProfile: { include: { user: true } } },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(201).json({ courseshow: courseshow });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const courseGetMyPersonal = async (req, res) => {
  try {
    let { id } = req.params;
    let courseshow = await prisma.course.findMany({
      where: {
        TeacherProfile: {
          user: {
            id: id,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        TeacherProfile: { include: { user: true } },
        CourseEnroll: {
          include: { StudentProfile: { include: { user: true } } },
        },
      },
    });

    res.status(201).json({ courseshow: courseshow });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//singleCourse

const singleCourse = async (req, res) => {
  const id = req.params.id;
  let course = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      TeacherProfile: { include: { user: true } },
      CourseEnroll: {
        include: { StudentProfile: { include: { user: true } } },
      },
    },
  });

  res.status(201).json({ course: course });
  try {
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//course update
const coursePatch = async (req, res) => {
  let {
    title,
    categories,
    description,
    seatStatus,
    address,
    cost,
    startDate,
    endDate,
  } = req.body;
  const id = req.params.id;

  try {
    let courseupdate = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        title: title,

        categories: categories,
        description: description,
        seatStatus: seatStatus,
        address: address,
        cost: cost,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json({ courseupdate: courseupdate });
    console.log(courseupdate);
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//course delete

const courseDelete = async (req, res) => {
  const id = req.params.id;

  try {
    let coursedelete = await prisma.course.delete({
      where: {
        id: id,
      },
    });

    res.status(201).json({ coursedelete: coursedelete });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = {
  courseGet,
  courseGetPersonal,
  coursePost,
  singleCourse,
  courseSearch,
  courseDelete,
  coursePatch,
  courseGetPersonal,
  courseGetMyPersonal,
};
