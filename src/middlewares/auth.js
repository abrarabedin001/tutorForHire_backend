const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const auth = (req, res, next) => {
  console.log('kaj kore skdflsj ');
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      let user = jwt.verify(token, SECRET_KEY);
      console.log('---------------------');
      req.user = user;
    } else {
      res.status(401).json({ message: 'Unauthorized User' });
    }
    next();
  } catch (error) {
    console.log('---------------------');
    console.log(req.headers.authorization);
    console.log(error);
  }
};
module.exports = auth;
