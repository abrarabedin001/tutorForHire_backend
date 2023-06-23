const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const signup = async (req, res) => {
  let { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword },
    });
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);

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

    res.status(200).json({ message: 'Signin successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
};
module.exports = { signin, signup };
