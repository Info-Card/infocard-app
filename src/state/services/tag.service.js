import api from './api';

class TagService {
  getAll(user) {
    return api.get(`tags/user?user=${user}`);
  }
  get(id) {
    return api.get(`tags/${id}`);
  }
  activate(id) {
    return api.get(`tags/activate/${id}`);
  }
  update(id, data) {
    return api.patch(`tags/${id}`, data);
  }
  delete(id) {
    return api.delete(`tags/${id}`);
  }
}

export default new TagService();
