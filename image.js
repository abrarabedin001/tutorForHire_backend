const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  // Process the uploaded image and save it in a specific folder
  // You can use fs.rename or other methods to move the file to a desired location
  const imagePath = path.join(__dirname, 'uploads', req.file.filename);
  
  res.json({ message: 'Image uploaded successfully' });
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});