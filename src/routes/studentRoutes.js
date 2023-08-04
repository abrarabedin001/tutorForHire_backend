const express = require('express');
const prisma = require('../Database');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
const {
  create,
  update,
  GetProfile,
} = require('../controllers/studentController');
const auth = require('../middlewares/auth');

const studentRouter = express.Router();

studentRouter.post('/create', [auth, upload.single('image')], create);
studentRouter.patch('/studentupdate', auth, update);
studentRouter.get('/getprofile', [auth, upload.single('image')], GetProfile);

module.exports = studentRouter;
