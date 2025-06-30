import axios from 'axios';
import Config from 'react-native-config';

import { BASE_URL } from './config';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${Config.API_READ_TOKEN}`
    }
});

export default api;