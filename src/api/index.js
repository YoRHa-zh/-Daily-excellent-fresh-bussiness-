import axios from 'axios';
import store from '@/store/index';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport') || config.url.includes('/category/add')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
}, (error) => Promise.reject(error));

instance.interceptors.response.use((response) => {
  if (response.data.status === 'success') {
    return response.data.data;
  }
  return Promise.reject(response.data.msg);
}, (error) => Promise.reject(error));
export default instance;
