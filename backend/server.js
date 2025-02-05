const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // To load environment variables from .env file

const app = express();

// Middleware to allow requests from the frontend
app.use(cors());

// Route to fetch coin data (e.g., details of a specific coin)
app.get("/api/coin/:coinId", async (req, res) => {
  try {
    const { coinId } = req.params;
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}`, 
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.CG_API_KEY, // Using the API key from the .env file
        },
      }
    );
    res.json(response.data); // Send the fetched coin data back to the React frontend
  } catch (error) {
    console.error("Error fetching coin data:", error.message);
    res.status(500).json({ error: "Failed to fetch coin data" });
  }
});

// Route to fetch market chart data for a coin
app.get("/api/market-chart/:coinId/:currency", async (req, res) => {
  try {
    const { coinId, currency } = req.params;
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=10`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.CG_API_KEY,
        },
      }
    );
    res.json(response.data); // Send the market chart data back to the React frontend
  } catch (error) {
    console.error("Error fetching market chart data:", error.message);
    res.status(500).json({ error: "Failed to fetch market chart data" });
  }
});

// Set the port for the backend server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
