import React, { useState } from "react";
import axios from "axios";
import FileUploader from "../../components/FileUploader/FileUploader";
import Loader from "../../components/Loader/Loader";
import TextOutput from "../../components/TextOutput/TextOutput";
import "./Home.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState(null);

  const handleFileProcessing = async (file) => {
    setIsLoading(true);
    setError(null);
    setExtractedText("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Make the API call to upload the file
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set extracted text from the response
      setExtractedText(response.data.text);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(err.response?.data?.message || "Failed to upload file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <header>
        <h1>Welcome to the Social Media Content Analyzer</h1>
        <p>Upload your document to analyze its content and improve engagement!</p>
      </header>
      <div className="file-upload-section">
        {!isLoading && (
          <FileUploader onFileSelect={(file) => handleFileProcessing(file)} />
        )}
        {isLoading && <Loader />}
      </div>
      <div className="output-section">
        {extractedText && <TextOutput heading="Extracted Content" text={extractedText} />}
        {error && <div className="error"><p>{error}</p></div>}
      </div>
    </div>
  );
};

export default Home;
