import axios from '.';

export default {
  changeUserInfo(params) {
    return axios.put('/passport/changeUserInfo', params);
  },

};
