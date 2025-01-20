const express = require('express');
const { extractTextFromImage } = require('../utils/ocr'); // Import OCR utility function
const router = express.Router();

// Route to process OCR on uploaded images
router.post('/', async (req, res) => {
  const { filePath } = req.body; // Path to the uploaded file

  // Check if the file path is provided
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  try {
    // Perform OCR on the file
    const extractedText = await extractTextFromImage(`.${filePath}`); // Prepend "." for relative path
    res.json({
      message: 'OCR processing successful',
      extractedText,
    });
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ error: 'Failed to process OCR' });
  }
});

module.exports = router;
