const express = require('express');
const { extractTextFromPDF } = require('../utils/pdfParser'); // Import PDF utility function
const router = express.Router();

// Route to process PDF text extraction
router.post('/', async (req, res) => {
  const { filePath } = req.body; // Path to the uploaded file

  // Check if the file path is provided
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  try {
    // Perform PDF text extraction
    const extractedText = await extractTextFromPDF(`.${filePath}`); // Prepend "." for relative path
    res.json({
      message: 'PDF text extraction successful',
      extractedText,
    });
  } catch (error) {
    console.error('PDF Error:', error);
    res.status(500).json({ error: 'Failed to extract text from PDF' });
  }
});

module.exports = router;
