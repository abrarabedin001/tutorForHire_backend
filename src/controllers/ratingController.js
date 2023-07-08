const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const giveRating = async (req, res) => {
  let { studentProfileId, courseId, rate } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { StudentProfile: true },
  });
  console.log(user);

  // Check if the rate is within the range of 1 to 5
  if (rate >= 1 && rate <= 5) {
    try {
      const postRating = await prisma.rating.create({
        data: {
          studentProfileId: user.StudentProfile.id,
          courseId: courseId,
          rate: rate,
        },
      });

      res.status(201).json({ postRating: postRating });
    } catch (err) {
      res.status(404).json({ message: 'Something went wrong', error: err });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Invalid rate value. Rate must be between 1 and 5.' });
  }
};

const seeRating = async (req, res) => {
  let { courseId } = req.body;

  try {
    const ratings = await prisma.rating.findMany({
      where: {
        courseId: courseId,
      },
    });
    // Calculate the sum of all ratings
    const sumRatings = ratings.reduce(
      (total, rating) => total + rating.rate,
      0,
    );

    // Calculate the average rating
    const averageRating = Math.round(sumRatings / ratings.length);
    console.log(ratings);
    console.log(averageRating);
    res.status(201).json({ rating: averageRating });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

//
module.exports = { seeRating, giveRating };
