import axios from '.';

export default {
  list(params) {
    return axios.get('/category/all', {
      params,
    });
  },
  edit(params) {
    return axios.put('/category/edit', params);
  },
  add(params) {
    return axios.post('/category/add', params);
  },
  delete(params) {
    return axios.delete(`/category/${params.id}`);
  },
};
