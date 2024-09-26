const axios = require("axios");

// Your hardcoded Monster API key
const MONSTER_API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjRhYTU1N2FkNmJhOTI5MjkxZTFhYjQ0NDE2NTQ4ZGQ3IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDktMjZUMDU6MDI6NTMuMzc4MjUyIn0.OXnYJXBWasd1n6MnGSnsXGlOi5fcww75gjgjWSBswyk"; // Make sure this is the correct key

// Function to generate the image using Monster API
const modelGen = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const MONSTER_API_URL = "https://api.monsterapi.ai/v1/generate/txt2img";

    console.log("Sending request to Monster API with prompt:", description);

    const initialResponse = await axios.post(
      MONSTER_API_URL,
      {
        prompt: description,
        safe_filter: true,
        samples: 1,
        guidance_scale: 7.5,
        steps: 100,
        aspect_ratio: "portrait",
      },
      {
        headers: {
          Authorization: `Bearer ${MONSTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Monster API Initial Response:", initialResponse.data);

    const { process_id, status_url } = initialResponse.data;

    if (!process_id || !status_url) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve process ID or status URL" });
    }

    const imageUrls = await checkStatus(status_url);

    if (imageUrls) {
      return res
        .status(200)
        .json({ message: "Image generated successfully", imageUrls });
    } else {
      return res.status(500).json({ error: "Image generation failed" });
    }
  } catch (error) {
    console.error("Error generating image from Monster API:", error);

    if (error.response) {
      console.log("Response data:", error.response.data);
      res.status(error.response.status).json({
        error: error.response.data || "Failed to generate image",
      });
    } else if (error.request) {
      res.status(500).json({ error: "No response received from Monster API" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const checkStatus = async (statusUrl) => {
  let isCompleted = false;
  let imageUrls = [];

  const maxPollingTime = 5 * 60 * 1000; // 5 minutes
  const startTime = Date.now();

  while (!isCompleted && Date.now() - startTime < maxPollingTime) {
    try {
      const response = await axios.get(statusUrl, {
        headers: {
          Authorization: `Bearer ${MONSTER_API_KEY}`,
        },
      });

      console.log("Polling response:", response.data);

      // Check if the status is COMPLETED
      if (response.data.status === "COMPLETED") {
        imageUrls = response.data.result.output; // Assuming output contains image URLs
        isCompleted = true;
      } else {
        console.log("Image not ready yet, retrying...");
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Poll every 10 seconds
      }
    } catch (error) {
      console.error("Error polling for image result", error);
      throw error;
    }
  }

  if (!isCompleted) {
    throw new Error("Image generation timed out after 5 minutes");
  }

  return imageUrls;
};

module.exports = { modelGen, checkStatus };
