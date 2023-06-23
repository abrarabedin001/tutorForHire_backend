const express = require('express');
const userRouter = require('./routes/userRoutes');
const tutorRouter = require('./routes/tutorRoutes');
const app = express();

app.use(express.json());


// localhost:3000/users/signin
// post request {email,pasword}
// if login?sussess:failure

// localhost:3000/users/signup
// post request {email,pasword, username}
// if login?sussess:failure

app.use('/users', userRouter);
app.use('/tutor',tutorRouter)
// app.post('/users/signin', userRouter);
// app.post('/users/signup', userRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello');
});

app.listen(5000, () => {
  console.log('Server started on port no:5000');
});
