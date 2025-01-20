const Tesseract = require('tesseract.js');

// Utility function to perform OCR on an image
const extractTextFromImage = async (filePath) => {
  try {
    // Perform OCR using Tesseract.js
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
      logger: (info) => console.log(info), // Logs OCR progress (optional)
    });
    return text;
  } catch (error) {
    console.error('Tesseract OCR Error:', error);
    throw new Error('Error processing OCR');
  }
};

module.exports = { extractTextFromImage };
