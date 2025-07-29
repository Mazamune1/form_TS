const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5ax4uJ1E1t7LH7oBg2u_XAk19bh8OjqKkcVBoE17wbNzt8ndIgE0ICABxpuDwbasvbg/exec';

// Proxy POST
app.post('/update', async (req, res) => {
  try {
    const response = await axios.post(SCRIPT_URL, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Forwarding failed' });
  }
});

// Proxy GET
app.get('/latest-row', async (req, res) => {
  try {
    const response = await axios.get(`${SCRIPT_URL}?action=latest`);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Fetching latest row failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
