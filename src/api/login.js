import axios from '.';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
};
