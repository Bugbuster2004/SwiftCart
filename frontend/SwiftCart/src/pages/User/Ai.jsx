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
      <Container>
        <Form>
          <label>Generate 3D Model</label>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query for 3D model"
          />
          <Button onClick={handleSearch}>Generate 3D Model</Button>
        </Form>

        {loading && <Status>Generating model...</Status>}
        {error && <Status error>{error}</Status>}

        {generatedImages.length > 0 && (
          <ModelViewer>
            {generatedImages.map((url, index) => (
              <img key={index} src={url} alt={`Generated Model ${index}`} />
            ))}
          </ModelViewer>
        )}
      </Container>
    </Layout>
  );
}

export default Ai;

// Styled components for professional styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  label {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #6b8f71;
    box-shadow: 0 0 5px rgba(107, 143, 113, 0.4);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #6b8f71;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #345635;
  }
`;

const Status = styled.p`
  font-size: 16px;
  color: ${(props) => (props.error ? "#ff4d4f" : "#6b8f71")};
  margin-top: 20px;
`;

const ModelViewer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 500px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;
