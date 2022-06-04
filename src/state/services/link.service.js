import api from './api';

class LinkService {
  getLinks(profileId) {
    return api.get(`links/profile/${profileId}?isSaved=false`);
  }
  getLink(id) {
    return api.get(`links/${id}`);
  }

  create(data) {
    return api.post('links', data);
  }

  update(id, data) {
    return api.patch(`links/${id}`, data);
  }

  delete(id) {
    return api.delete(`links/${id}`);
  }
}

export default new LinkService();
