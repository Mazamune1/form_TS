const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8ZpniVJ7ZWwqBVVv93gP5qSXHiEH5GPjh9MvXxqHTeofL4yQsGlQ02zUyMj1ocyhZUw/exec';

// ส่งข้อมูลไปอัปเดตแถว
app.post('/update', async (req, res) => {
  try {
    const response = await axios.post(SCRIPT_URL, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding to Apps Script:', error.message);
    res.status(500).json({ error: 'Forwarding failed' });
  }
});

// อ่านแถวล่าสุด
app.get('/latest-row', async (req, res) => {
  try {
    const response = await axios.get(`${SCRIPT_URL}?action=latest`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching latest row:', error.message);
    res.status(500).json({ error: 'Fetching latest row failed' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy server running');
});
