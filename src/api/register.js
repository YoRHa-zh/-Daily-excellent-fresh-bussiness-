import axios from '.';

export default {
  login(params) {
    return axios.post('/passport/logon', params);
  },
  getCode(params) {
    return axios.post('/passport/getCode', params);
  },
  findPassword(params) {
    return axios.post('/passport/findBack', params);
  },
};
