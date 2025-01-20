const fs = require('fs');
const pdfParse = require('pdf-parse');

// Utility function to extract text from a PDF file
const extractTextFromPDF = async (filePath) => {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF and extract text
    const data = await pdfParse(dataBuffer);
    return data.text; // Extracted text
  } catch (error) {
    console.error('PDF Parse Error:', error);
    throw new Error('Error extracting text from PDF');
  }
};

module.exports = { extractTextFromPDF };
