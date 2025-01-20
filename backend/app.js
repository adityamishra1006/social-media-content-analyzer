const express = require('express');
const multer = require('multer');
const path = require('path');




const app = express();
const port = 5000;

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve static files (uploaded files)
app.use('/uploads', express.static('uploads'));

const cors = require('cors');
app.use(cors());

// Handle the file upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  // Send back the file info (can customize as needed)
  res.status(200).send({
    message: 'File uploaded successfully.',
    file: req.file,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
