const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';

const auth = (req, res, next) => {
  console.log('kaj kore skdflsj ');
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (token) {
      token = token.split(' ')[1];
      let user = jwt.verify(token, SECRET_KEY);
      console.log('---------------------');
      console.log('auth is working');
      req.user = user;
      console.log(req.user);
    } else {
      console.log('auth is not working');
      res.status(401).json({ message: 'Unauthorized User' });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorised User' });
  }
};
module.exports = auth;
