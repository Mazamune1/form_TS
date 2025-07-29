const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// แทนที่ URL Google Apps Script ให้เป็น URL จริงของคุณ
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5ax4uJ1E1t7LH7oBg2u_XAk19bh8OjqKkcVBoE17wbNzt8ndIgE0ICABxpuDwbasvbg/exec';

// Proxy GET: ดึงข้อมูลแถวล่าสุดจาก Google Script
app.get('/latest-row', async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL, {
      params: { action: 'getLatestRow' } // กรณีสคริปต์รองรับพารามิเตอร์นี้
    });
    // ตรวจสอบโครงสร้างข้อมูล response.data ตามที่ Google Script คืนค่า
    res.json({ status: 'success', row: response.data.row });
  } catch (error) {
    console.error('Error in /latest-row:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Proxy POST: ส่งข้อมูล update ไปยัง Google Script
app.post('/update', async (req, res) => {
  try {
    const payload = req.body;

    // ตรวจสอบว่ามี action หรือไม่ ถ้าไม่มีให้ตั้ง default
    if (!payload.action) {
      payload.action = 'saveForm2'; // หรือ 'saveForm1' ตามต้องการ
    }

    const response = await axios.post(
      GOOGLE_SCRIPT_URL,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    // ส่ง response จาก Google Script กลับ client
    res.json(response.data);
  } catch (error) {
    console.error('Error in /update:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
