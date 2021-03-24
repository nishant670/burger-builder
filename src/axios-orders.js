import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-2c8dc.firebaseio.com/'
});

export default instance;