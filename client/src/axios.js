import axios from 'axios';


axios.defaults.withCredentials = true

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
const instance = axios.create({
    baseURL: serverUrl
});

export default instance;