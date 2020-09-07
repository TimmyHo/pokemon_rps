import axios from 'axios';

// Keep this using localhost, but use am env variable in the future
const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

export default instance;