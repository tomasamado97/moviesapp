import axios from 'axios';

import { BASE_URL } from './config';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_READ_TOKEN}`
    }
});

export default api;