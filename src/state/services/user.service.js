import api from "./api";

class UserService {
  getAll(page, limit) {
    return api.get(`/v1/users?page=${page}&limit=${limit}`);
  }

  get(id, query) {
    return api.get(`/v1/users/${id}${query ? query : ""}`);
  }

  getProfile(username, user) {
    return api.get(`/v1/users/${user ? username : `public/${username}`}`);
  }

  create(data) {
    return api.post("/v1/users", data);
  }

  delete(id) {
    return api.delete(`/v1/users/${id}`);
  }

  exchangeContact(profileId, data) {
    return api.post(`/v1/profile/exchange/${profileId}`, data);
  }

  update(data) {
    return api.patch("/v1/users/", data);
  }
}

export default new UserService();
