import ApiService from "./ApiService";

class TagService extends ApiService {
  getAll() {
    return this.instance.get(`/v1/tags/user`);
  }

  /**
   * Show tag with the id
   * @param {string} id * This is the id of tag
   */
  get(id) {
    return this.instance.get(`/v1/tags/${id}`);
  }

  /**
   * Update tag using id with data
   * @param {string} id * This is the id of tag
   * @param {string} data * This is the data
   */
  update(id, data) {
    return this.instance.patch(`/v1/tags/${id}`, data);
  }

  /**
   * Unlink tag with the id
   * @param {string} id * This is the id of tag
   */
  unlink(id) {
    return this.instance.get(`/v1/tags/unlink/${id}`);
  }
  /**
   * Link tag with the id
   * @param {string} id * This is the id of tag
   */
  link(id) {
    return this.instance.get(`/v1/tags/link/${id}`);
  }
}

const tagService = new TagService();

export default tagService;
