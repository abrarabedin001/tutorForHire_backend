const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/classroomRoutes');
const SECRET_KEY = 'skldjfa;lsdj';

//--------------------------------------createquestion
const createQues = async (req, res) => {
  let { title, question, marks, end_date, courseId } = req.body;

  try {
    // Check if the user has a Teacher profile
    const user = await prisma.User.findUnique({
      where: { id: req.user.id },
      include: { TeacherProfile: true },
    });

    if (!user || !user.TeacherProfile) {
      return res.status(400).json({ message: 'Only teachers are allowed to post questions' });
    }

    const postques = await prisma.Question.create({
      data: {
        title: title,
        question: question,
        courseId: courseId,
        marks: marks,
        end_date: end_date,
        userId: req.user.id,
      },
    });

    res.status(201).json({ postques: postques });
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong', error: err });
  }
};


//-------------------------------------create answer
const createAns = async (req, res) => {
    let { answer, quesId} = req.body;
  
    try {
      // Check if the user has a Student profile
      const user = await prisma.User.findUnique({
        where: { id: req.user.id },
        include: { StudentProfile: true },
      });
  
      if (!user || !user.StudentProfile) {
        return res.status(400).json({ message: 'Only students are allowed to post answers' });
      }
  
      // Fetch the classroom (question) information
      const classroom = await prisma.Question.findUnique({
        where: { id: quesId },
      });
  
      if (!classroom) {
        return res.status(500).json({ message: 'Classroom (question) not found' });
      }
  
      // Check if the ans_date is before or equal to the end_date
      if (classroom.end_date < new Date()) {
        return res.status(404).json({ message: 'Posting answers is not allowed after the end date' });
      }
  
      const postAns = await prisma.Answer.create({
        data: {
          answer: answer,
          quesId: quesId,
          userId: req.user.id
        },
      });
  
      res.status(201).json({ postAns: postAns });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  };


//-----------------------------------------update feedback and marking
const postFeedback = async (req, res) => {
    let { answerId, feedback, marking } = req.body;
  
    try {
      // Check if the user has a Teacher profile
      const user = await prisma.User.findUnique({
        where: { id: req.user.id },
        include: { TeacherProfile: true },
      });
  
      if (!user || !user.TeacherProfile) {
        return res.status(500).json({ message: 'Only teachers are allowed to post feedback and marking' });
      }
  
      // Fetch the answer information
      const answer = await prisma.Answer.findUnique({
        where: { id: answerId },
        include: { Question: true },
      });
  
      if (!answer) {
        return res.status(400).json({ message: 'Answer not found' });
      }
  
      // Update the feedback and marking for the answer
      const updatedAnswer = await prisma.Answer.update({
        where: { id: answerId },
        data: {
          feedback: feedback,
          marking: marking,
        },
      });
  
      res.status(201).json({ updatedAnswer: updatedAnswer });
    } catch (err) {
      res.status(404).json({ message: 'Something went wrong', error: err });
    }
  };
  

//-----------------------------------show all the answer  
const getAnswers = async (req, res) => {
    const { quesId } = req.params;
  
    try {
      // Fetch the question information
      const question = await prisma.Question.findUnique({
        where: { id: quesId },
      });
  
      if (!question) {
        return res.status(500).json({ message: 'Question not found' });
      }
  
      // Check if the current date is after the end_date
      if (new Date() <= question.end_date) {
        return res.status(400).json({ message: 'The end_date has not passed yet' });
      }
  
      // Fetch all answers for the question after its end_date
      const answers = await prisma.Answer.findMany({
        where: {
          quesId: quesId,
          ans_date: {
            gt: question.end_date,
          },
        },
      });
  
      res.status(201).json({ answers: answers });
    } catch (err) {
      res.status(404).json({ message: 'Something went wrong', error: err });
    }
  };
  
  

module.exports = { createQues, createAns,postFeedback,getAnswers};
