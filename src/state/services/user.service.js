import api from './api';

class UserService {
  getAll(page, limit) {
    return api.get(`users?page=${page}&limit=${limit}`);
  }

  get(id, query) {
    return api.get(`users/${id}${query ? query : ''}`);
  }

  create(data) {
    return api.post('users', data);
  }

  update(id, data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key === 'image') {
        if (value && value[0]) {
          formData.append('image', value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });
    return api.patch(`profile/${id}`, formData, config);
  }

  delete(id) {
    return api.delete(`users/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new UserService();
