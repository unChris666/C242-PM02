// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios({
      method: req.method,
      url: 'http://34.101.174.135:8080',
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Forward the response from the external API to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error in proxy:', error);
    res.status(error.response?.status || 500).json({ message: 'Error occurred' });
  }
}