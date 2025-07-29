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
app.get('/latest-row', async (req, res) => {
  try {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbxMQCJ36L-fgDZEp1jrYpWK0A0gbQQbbDIXBtRJs1W-FO1Fsk6GMvN_FviTTM8wtxpQaA/exec'); // หรือดึงจาก sheet โดยตรง
    res.json({ status: 'success', row: response.data.row }); // ตัวอย่าง
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/update', async (req, res) => {
  try {
    const payload = {
      action: 'saveForm2',
      data: req.body
    };

    const response = await axios.post(
      'URL_GOOGLE_SCRIPT_ENDPOINT',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
