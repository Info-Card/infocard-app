import api from './api';

class UserService {
  getAll(page, limit) {
    return api.get(`users?page=${page}&limit=${limit}`);
  }

  get(id, query) {
    return api.get(`users/${id}${query ? query : ''}`);
  }

  getProfile(username, user) {
    return api.get(`users/${user ? username : `public/${username}`}`);
  }

  create(data) {
    return api.post('users', data);
  }

  delete(id) {
    return api.delete(`users/${id}`);
  }

  exchangeContact(profileId, data) {
    return api.post(`profile/exchange/${profileId}`, data);
  }

  update(data) {
    return api.patch('users/', data);
  }
}

export default new UserService();
