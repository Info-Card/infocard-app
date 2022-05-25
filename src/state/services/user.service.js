import api from './api';

class UserService {
  get(username) {
    return api.get(`users/public/${username}`);
  }
}

export default new UserService();
