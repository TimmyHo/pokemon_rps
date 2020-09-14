import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
const instance = axios.create({
    baseURL: serverUrl
});

export default instance;