import UpdateProfileFn from "helpers/UpdateProfileFn";
import ApiService from "./ApiService";

class LinkService extends ApiService {
  /**
   * Show all links with the given profileId
   * @param {string} profileId * This is the profileId
   */
  getLinks(profileId) {
    return this.instance.get(`/v1/links/profile/${profileId}?isSaved=false`);
  }

  /**
   * Show Link with the id
   * @param {string} id * This is the id of user
   */
  getLink(id) {
    return this.instance.get(`/v1/links/${id}`);
  }

  /**
   * Create Link with the data
   * @param {string} data * This is the data
   */
  create(data) {
    return this.instance.post("/v1/links", data);
  }

  /**
   * Update Link using id and data
   * @param {string} id * This is the id of link
   * @param {string} data * This is the data
   */
  update(id, data) {
    return this.instance.patch(`/v1/links/${id}`, data);
  }

  /**
   * Delete link with the id
   * @param {string} id * This is the id of link
   */
  delete(id) {
    return this.instance.delete(`/v1/links/${id}`);
  }
  /**
   * Upload link file
   * @param {File} file * This is the file to upload
   */
  uploadFile(file) {
    const { formData, config } = UpdateProfileFn({ file });
    return this.instance.patch("/v1/upload", formData, config);
  }
}

const linkService = new LinkService();

export default linkService;
