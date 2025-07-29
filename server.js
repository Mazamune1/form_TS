// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy endpoint
app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbysvJjX5oJtQ-r-53PHjRmN1zK4dqnrsjzXaveXkXcJDlhOVT-R10cMC4xzQpLUrm0-DQ/exec',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = typeof response.data === 'string'
      ? JSON.parse(response.data)
      : response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});
