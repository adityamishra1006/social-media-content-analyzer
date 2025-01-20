import React, { useState } from "react";
import axios from "axios";
import "./TextOutput.css";

const TextOutput = ({ heading }) => {
  const [text, setText] = useState(null); // State to store the fetched text
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(null); // State to store errors

  // Function to fetch text from the API
  const fetchText = async () => {
    setLoading(true); // Show loader
    setError(null); // Reset error state
    setText(null); // Reset text state

    try {
      // Replace `/text` with your actual API endpoint
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/text`);
      setText(response.data.text); // Store the fetched text
    } catch (err) {
      console.error("Error fetching text:", err);
      setError(err.response?.data?.message || "Failed to fetch text.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="text-output">
      {heading && <h2 className="text-output-heading">{heading}</h2>}
      <div className="text-output-content">
        {/* Loading spinner */}
        {loading && (
          <p className="text-output-placeholder">Fetching text, please wait...</p>
        )}

        {/* Display fetched text */}
        {text && <p>{text}</p>}

        {/* Display error if present */}
        {error && <p className="text-output-placeholder error">{error}</p>}

        {/* Display placeholder when no text */}
        {!loading && !text && !error && (
          <p className="text-output-placeholder">No text to display</p>
        )}
      </div>

      {/* Button to fetch text */}
      <button onClick={fetchText} className="fetch-text-button">
        {loading ? "Loading..." : "Fetch Text"}
      </button>
    </div>
  );
};

export default TextOutput;
