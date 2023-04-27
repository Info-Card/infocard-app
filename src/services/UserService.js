import ApiService from "./ApiService";

class UserService extends ApiService {
  /**
   * Show all users with the given page and limit
   * @param {string} page * This is the number of pages
   * @param {string} limit * This is the limit of users show on one page
   */
  getAll(page, limit) {
    return this.instance.get(`/v1/users?page=${page}&limit=${limit}`);
  }

  /**
   * Show user with the id and query
   * @param {string} id * This is the id of user
   * @param {string} query * This is the query
   */
  get(id, query) {
    return this.instance.get(`/v1/users/${id}${query ? query : ""}`);
  }

  /**
   * Show user Profile with the username and user
   * @param {string} username * This is the username of user
   * @param {string} user * This is the user
   */
  getProfile(username, user) {
    return this.instance.get(
      `/v1/users/${user ? username : `public/${username}`}`
    );
  }

  /**
   * Show create user
   * @param {string} data * This is the data of user
   */
  create(data) {
    return this.instance.post("/v1/users", data);
  }

  /**
   * Delete user with the id
   * @param {string} id * This is the id of user
   */
  delete(id) {
    return this.instance.delete(`/v1/users/${id}`);
  }

  /**
   * Exchange Contact of user
   * @param {string} profileId * This is the Profile id of user
   * @param {string} data * This is the data of user
   */
  exchangeContact(profileId, data) {
    return this.instance.post(`/v1/profile/exchange/${profileId}`, data);
  }
  /**
   * User data update
   * @param {string} data * This is the data of user
   */
  update(data) {
    return this.instance.patch("/v1/users/", data);
  }
}

const userService = new UserService();

export default userService;
