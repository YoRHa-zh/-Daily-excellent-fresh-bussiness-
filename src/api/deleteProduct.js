import axios from '.';

export default {
  delete(params) {
    return axios.delete(`/products/${params.id}`);
  },
};
