const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const giveRatingReview = async (req, res) => {
  let { courseId, rate, comment } = req.body;
  // ------------

  // --------------

  // Check if the rate is within the range of 1 to 5
  if (rate >= 1 && rate <= 5) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { StudentProfile: true },
      });

      const postRating = await prisma.ratingReview.create({
        data: {
          studentProfileId: user.StudentProfile.id,
          courseId: courseId,
          rate: rate,
          comment: comment,
        },
      });

      const ratings = await prisma.ratingReview.findMany({
        where: {
          courseId: courseId,
        },
      });

      // Calculate the sum of all ratings
      const sumRatings = ratings.reduce(
        (total, ratingReview) => total + ratingReview.rate,
        0,
      );

      // Calculate the average rating

      const averageRating = Math.round(sumRatings / ratings.length);

      const updateCourse = await prisma.course.update({
        where: { id: courseId },
        data: { rate: averageRating },
      });
      console.log(updateCourse);
      res.status(201).json({ updateCourse: updateCourse });
    } catch (err) {
      res.status(404).json({ message: 'Something went wrong', error: err });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Invalid rate value. Rate must be between 1 and 5.' });
  }
};

const showRatingReview = async (req, res) => {
  let { id1 } = req.params;

  try {
    const alldetails = await prisma.RatingReview.findMany({
      where: {
        courseId: id1,
      },
      include: { StudentProfile: { include: { user: true } } },
    });

    res.status(201).json({ ratingReview: alldetails });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const seeTotalRating = async (req, res) => {
  let { id1 } = req.params;

  try {
    const ratings = await prisma.ratingReview.findMany({
      where: {
        courseId: id1,
      },
    });
    // Calculate the sum of all ratings
    const sumRatings = ratings.reduce(
      (total, ratingReview) => total + ratingReview.rate,
      0,
    );

    // Calculate the average rating

    const averageRating = Math.round(sumRatings / ratings.length);

    res.status(201).json({ averageRating: averageRating });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//
module.exports = { seeTotalRating, giveRatingReview, showRatingReview };
