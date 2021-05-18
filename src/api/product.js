import axios from '.';

export default {
  tableData(params) {
    console.log(params);
    return axios.get('/products/all', { params });
  },
};
