import https from 'https';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
  httpsAgent: new https.Agent({ rejectUnauthorized: false }), // <-- ignore SSL
  headers: {
    'Content-Type': 'application/json',
  },
});
