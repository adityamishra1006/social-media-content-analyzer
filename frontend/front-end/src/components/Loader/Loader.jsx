import React, { useState } from "react";
import "./Loader.css"; // Keep the original styling
import axios from "axios";

const Loader = () => {
  const [loading, setLoading] = useState(false); // State to show/hide the loader
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store errors

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Show loader
    setError(null); // Reset error state
    setData(null); // Reset data state

    try {
      // Replace `/data` with your actual back-end API endpoint
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
      setData(response.data); // Store the fetched data
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="loader-container">
      <h2>Loader with API Call</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Data"}
      </button>

      {/* Loader */}
      {loading && (
        <div>
          <div className="spinner"></div>
          <p>Loading, please wait...</p>
        </div>
      )}

      {/* Display Data */}
      {data && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h3>Data Fetched Successfully:</h3>
          <pre style={{ textAlign: "left" }}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Loader;
