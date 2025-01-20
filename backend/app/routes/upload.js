const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: './uploads', // Destination folder for uploaded files
  filename: (req, file, cb) => {
    // Append timestamp to make filenames unique
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// File filter to allow only PDFs and images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only PDF and image files are allowed'), false); // Reject file
  }
};

// Multer instance with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Route to handle single file upload
router.post('/', upload.single('file'), (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid file type' });
  }

  // Send response with file path
  res.json({
    message: 'File uploaded successfully',
    filePath: `/uploads/${req.file.filename}`, // File path relative to the server
    originalName: req.file.originalname,       // Original file name
    size: req.file.size,                       // File size in bytes
  });
});

// Handle errors gracefully
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle multer-specific errors
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    // Handle other errors
    return res.status(500).json({ error: err.message });
  }
  next();
});

module.exports = router;
