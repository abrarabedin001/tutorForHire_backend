const prisma = require('../Database');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  let { email, name, password } = req.body;
  try {
    let users = await prisma.user.findMany();
    const hashedPassword = await bcrypt.hash(password, 10);
    res.status(200).json({ message: hashedPassword });
  } catch (err) {}
};

const signin = (req, res) => {};
module.exports = { signin, signup };
