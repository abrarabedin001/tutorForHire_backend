const prisma = require('../Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'skldjfa;lsdj';


const courseGet = async (req, res) => {
    let {catagories}=req.body

    try {
      let coursedetails = await prisma.course.findMany({
        where :{
            categories:catagories
        },
      });
  
      res.status(201).json({ coursedetails: coursedetails });
    } catch (err) {
      res.status(404).json({ message: 'something went wrong', error: err });
    }
  };
  
  const coursePost = async (req, res) => {
    let {title,description,seatStatus,address,endDate, categories }=req.body
    let courseCreate = await prisma.course.create({
        data :{title:title,description:description,seatStatus:seatStatus,
            address:address,endDate:endDate, categories:categories
        },
      });
      console.log(courseCreate)
      res.status(201).json({ courseCreate: courseCreate });
    try {

    } catch (err) {
      res.status(404).json({ message: 'something went wrong', error: err });
    }
  };


  module.exports = { courseGet,coursePost};