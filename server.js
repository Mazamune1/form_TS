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
      'https://script.google.com/macros/s/AKfycbxcXkZ0NC_vrQ6GLsNLSNbnjOpuHncNDvjAFa45pPPw1IYBfwhFZqnbAzotPNYbVN8COw/exec', // ใส่ URL ของ Google Apps Script Web App ที่ deploy แล้ว
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
