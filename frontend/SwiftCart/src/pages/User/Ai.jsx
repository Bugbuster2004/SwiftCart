import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";

function Ai() {
  const [searchQuery, setSearchQuery] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/3d/generate3dmodel`,
        { description: searchQuery } // Send "description" to match the backend
      );
      setGeneratedImages(response.data.imageUrls); // Store all image URLs
      setLoading(false);
    } catch (error) {
      setError("Failed to generate model.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query for 3D model"
        />
        <button onClick={handleSearch}>Generate 3D Model</button>

        {loading && <p>Generating model...</p>}
        {error && <p>{error}</p>}
        {generatedImages.length > 0 &&
          generatedImages.map((url, index) => (
            <img key={index} src={url} alt={`Generated Model ${index}`} />
          ))}
      </div>
    </Layout>
  );
}

export default Ai;

// Styled components for styling the form and image viewer
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin-bottom: 10px;
    font-size: 18px;
  }

  input {
    margin-left: 10px;
    padding: 5px;
    width: 300px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const ModelViewer = styled.div`
  margin-top: 20px;
  text-align: center;

  img {
    max-width: 600px;
    height: auto;
  }
`;
