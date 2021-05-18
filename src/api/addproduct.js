import axios from '.';

export default {
  add(params) {
    return axios.post('/products/add', params);
  },
};
