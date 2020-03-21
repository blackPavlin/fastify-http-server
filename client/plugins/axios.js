import axios from 'axios';
import store from '../store/store';

const client = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
});

client.interceptors.request.use(request => {
    if (store.getters['auth/isAuth'] && !request.headers.common.Authorization) {
        const token = store.getters['auth/getToken'];
        request.headers.common.Authorization = `Bearer ${token}`
    }

    return request
});

export default client;
