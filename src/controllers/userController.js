const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const signup = async (req, res) => {
  let { email, name, password, type } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //query databse
    let user = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword, type: type },
    });

    // the token will be save in cookies (to see if signed in or not)
    const token = jwt.sign(
      { email: user.email, id: user.id, type: user.type, role: user.role },
      SECRET_KEY,
    );
    res.cookie(`token`, token, {
      maxAge: 5000,
      // expires works the same as the maxAge
      domain: 'localhost:3000/',
      expires: new Date(Date.now() + 25892000000),
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(201).json({ user: user, token: token });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      { email: user.email, id: user.id, type: user.type, role: user.role },
      SECRET_KEY,
    );
    res.cookie(`token`, token, {
      maxAge: 5000,
      // expires works the same as the maxAge
      expires: new Date(Date.now() + 25892000000),
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    });

    res
      .status(200)
      .json({ message: 'Signin successful', user: user, token: token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
};

const showProfile = async (req, res) => {
  // let { id } = req.params;

  try {
    const courses = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        TeacherProfile: true,
        StudentProfile: true,
      },
    });

    res.status(201).json({ data: courses });
  } catch (err) {
    res.status(404).json({ message: 'something went wrong', error: err });
  }
};

const changePass = async (req, res) => {
  const { oldPass, newPass } = req.body;
  console.log('old');
  console.log(oldPass);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    // Compare the old password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(oldPass, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPass, 10);

    // Update the user's password in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedNewPassword,
      },
    });
    console.log(updatedUser);
    res.status(201).json({ message: 'Password updated successfully.' });
    // Retrieve the user's current password from the database
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong', error: err });
  }
};

module.exports = { signin, signup, showProfile, changePass };
