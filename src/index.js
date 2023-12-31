const express = require('express');
const userRouter = require('./routes/userRoutes');
const tutorRouter = require('./routes/tutorRoutes');
const studentRouter = require('./routes/studentRoutes');
const courseRouter = require('./routes/courseRoutes');
const enrollRouter = require('./routes/enrollRoutes');
const ratingReviewRouter = require('./routes/ratingReviewRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
const chatRouter = require('./routes/chatRoutes');
const classroomRouter = require('./routes/classroomRoutes');

const app = express();

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/files', express.static('files'));
app.use(express.json());

app.use('/users', userRouter);
app.use('/tutor', tutorRouter);
app.use('/student', studentRouter);
app.use('/course', courseRouter);
app.use('/enrollcourse', enrollRouter);
app.use('/ratingreview', ratingReviewRouter);
app.use('/chat', chatRouter);
app.use('/classroom', classroomRouter);
// app.use('/review',reviewRouter)

app.get('/', (req, res) => {
  res.status(200).send('Hello');
});

app.listen(5000, () => {
  console.log('Server started on port no:5000');
});
