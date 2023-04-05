import ApiService from "./ApiService";

class LinkService extends ApiService {
  /**
   * Show all links with the given profileId
   * @param {string} profileId * This is the profileId
   */
  getLinks(profileId) {
    return this.instance.get(`links/profile/${profileId}?isSaved=false`);
  }

  /**
   * Show Link with the id
   * @param {string} id * This is the id of user
   */
  getLink(id) {
    return this.instance.get(`links/${id}`);
  }

  /**
   * Create Link with the data
   * @param {string} data * This is the data
   */
  create(data) {
    return this.instance.post("links", data);
  }

  /**
   * Update Link using id and data
   * @param {string} id * This is the id of link
   * @param {string} data * This is the data
   */
  update(id, data) {
    return this.instance.patch(`links/${id}`, data);
  }

  /**
   * Delete link with the id
   * @param {string} id * This is the id of link
   */
  delete(id) {
    return this.instance.delete(`links/${id}`);
  }
}

const linkService = new LinkService();

export default linkService;
