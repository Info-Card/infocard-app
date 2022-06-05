import api from './api';

class TagService {
  get(id) {
    return api.get(`tags/${id}`);
  }
  activate(id) {
    return api.get(`tags/activate/${id}`);
  }
}

export default new TagService();
