const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

//course insert or create
const coursePost = async (req, res) => {
  try {
    let {
      title,
      description,
      seatStatus,
      address,
      endDate,
      categories,
      teacherProfileId,
    } = req.body;
    endDate = new Date(endDate);

    let courseCreate = await prisma.course.create({
      data: {
        title: title,
        description: description,
        seatStatus: seatStatus,
        address: address,
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
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//search using categories
const courseSearch = async (req, res) => {
  let { query } = req.body;

  try {
    let coursedetails = await prisma.course.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            categories: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log(coursedetails);
    res.status(201).json({ coursedetails: coursedetails });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//for all courses page
const courseGet = async (req, res) => {
  console.log('get courses');
  try {
    let courseshow = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(201).json({ courseshow: courseshow });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};
//for single teacher
const courseGetPersonal = async (req, res) => {
  console.log('get courses');
  let {id}=req.params
  try {
    let courseshow = await prisma.course.findMany({
      where:{
        cr
      }
      orderBy: {
        createdAt: 'desc',
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
  try {
    let course = await prisma.course.findUnique({
      where: {
        id: id,
      },
    });

    res.status(201).json({ course: course });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//course update
const coursePatch = async (req, res) => {
  let { description, seatStatus, address, endDate } = req.body;
  const id = req.params.id;
  try {
    let courseupdate = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        description: description,
        seatStatus: seatStatus,
        address: address,
        endDate: endDate,
      },
    });

    res.status(201).json({ courseupdate: courseupdate });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//course delete

const courseDelete = async (req, res) => {
  try {
    let courseshow = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(201).json({ courseshow: courseshow });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = {
  courseGet,
  coursePost,
  singleCourse,
  courseSearch,
  courseDelete,
  coursePatch,
};
