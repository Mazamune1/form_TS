const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfL78kgNn9-bNVSj1mIRNKMD7gyfaWstEM04NIO0GfDhZneRgQBVa_H9bXiQMdDd31gw/exec';

// POST /update - ส่งข้อมูลไป Google Apps Script
app.post('/update', async (req, res) => {
  try {
    const response = await axios.post(SCRIPT_URL, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    // ตั้ง header เพื่อเพิ่มความปลอดภัยและประสิทธิภาพ
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding to Apps Script:', error.message);
    res.status(500).json({ error: 'Forwarding failed' });
  }
});

// GET /latest-row - ดึงแถวล่าสุดจาก Google Apps Script
app.get('/latest-row', async (req, res) => {
  try {
    // สมมติว่า Google Apps Script จะรับ ?action=latest เพื่อคืนแถวล่าสุด
    const response = await axios.get(`${SCRIPT_URL}?action=latest`);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching latest row:', error.message);
    res.status(500).json({ error: 'Fetching latest row failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
