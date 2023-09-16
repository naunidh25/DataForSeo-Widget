// server.js
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// API route to fetch DataForSEO data
app.post('/api/dataforseo', async (req, res) => {
  try {
    const { url } = req.body;
    const dataForSEOApiKey = 'ca734f914f2da722'; // Replace with your actual API key
    const apiUrl = 'https://api.dataforseo.com/v3/on_page/task_post';

    const response = await axios.post(
      apiUrl,
      {
        data: [
          {
            id: 'some_unique_id', // Replace with a unique ID
            priority: 1,
            type: 'on_page',
            params: {
              target: url,
              checks: ['enable_browser_rendering'],
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `username:${dataForSEOApiKey}`
          ).toString('base64')}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from DataForSEO API' });
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
