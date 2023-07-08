const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const giveReview = async (req, res) => {
  try {
    let { studentProfileId, courseId, comment } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { StudentProfile: true },
    });
    console.log(user);

    const postReview = await prisma.review.create({
      data: {
        courseId: courseId,
        comment: comment,
        studentProfileId: user.StudentProfile.id,
      },
    });
    console.log(postReview);

    res.status(201).json({ postReview: postReview });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const seeReview = async (req, res) => {
  let { courseId } = req.body;

  try {
    const review = await prisma.review.findMany({
      where: {
        courseId: courseId,
      },
      orderBy: {
        reviewDate: 'desc',
      },
    });
    console.log(review);
    res.status(201).json({ review: review });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

module.exports = { seeReview, giveReview };
