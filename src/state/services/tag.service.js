import api from './api';

class TagService {
  getAll() {
    return api.get(`tags/user`);
  }
  get(id) {
    return api.get(`tags/${id}`);
  }
  update(id, data) {
    return api.patch(`tags/${id}`, data);
  }
  unlink(id) {
    return api.get(`tags/unlink/${id}`);
  }
  link(id) {
    return api.get(`tags/link/${id}`);
  }
}

export default new TagService();
