const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors()); // อนุญาต CORS ทุกโดเมน
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy endpoint ดึงแถวล่าสุด
app.get('/latest-row', async (req, res) => {
  try {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbxMQCJ36L-fgDZEp1jrYpWK0A0gbQQbbDIXBtRJs1W-FO1Fsk6GMvN_FviTTM8wtxpQaA/exec');
    res.json({ status: 'success', row: response.data.row });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Proxy endpoint ส่งข้อมูล form2 update
app.post('/update', async (req, res) => {
  try {
    const payload = {
      action: 'saveForm2',
      data: req.body
    };

    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbx5ax4uJ1E1t7LH7oBg2u_XAk19bh8OjqKkcVBoE17wbNzt8ndIgE0ICABxpuDwbasvbg/exec',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
