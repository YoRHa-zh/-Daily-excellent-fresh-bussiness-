const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));

instance.interceptors.response.use((response) => {
  if (response.data.status === 'success') {
    return response.data.data;
  }
  return Promise.reject(response.data.msg);
}, (error) => Promise.reject(error));
export default instance;
