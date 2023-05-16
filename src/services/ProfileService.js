import getConfig from "helpers/getConfig";
import ApiService from "./ApiService";
import toFormData from "helpers/toFormData";
class ProfileService extends ApiService {
  /**
   * Update Profile with id and data
   * @param {string} id * This is the id of profile
   * @param {string} data * This is the data of new profile
   */
  updateProfile(id, data) {
    const formData = toFormData(data);
    const config = getConfig();
    return this.instance.patch(`/v1/profile/${id}`, formData, config);
  }

  /**
   * Update tag using id with data
   * @param {string} id * This is the id
   * @param {string} data * This is the data
   */
  updateVideos(id, data) {
    return this.instance.patch(`/v1/profile/${id}`, data);
  }

  /**
   * Update tag using id with data
   * @param {string} id * This is the id
   * @param {string} data * This is the data
   */
  update(id, data) {
    return this.instance.patch(`/v1/profile/${id}`, data);
  }

  /**
   * Exchange with profileId and data
   * @param {string} profileId * This is the ProfileId for exchange contact
   * @param {string} data * This is the data for exchange contact
   */
  exchangeContact(profileId, data) {
    return this.instance.post(`/v1/profile/exchange/${profileId}`, data);
  }
  /**
   * Add custom Link with id and data
   * @param {string} id * This is the id for add custom link
   * @param {string} data * This is the data
   */
  async addCustomLink(id, data) {
    const formData = await toFormData(data);
    const config = getConfig();
    return this.instance.post(`/v1/profile/${id}/links/`, formData, config);
  }

  /**
   * Update custom Link with profile id, link id and data
   * @param {string} profileid * This is the profileid for update custom link
   * @param {string} linkid * This is the linkid for update custom link
   * @param {string} data * This is the data
   */
  async updateCustomLink(profileId, linkId, data) {
    const formData = await toFormData(data);
    formData.delete("createdAt");
    formData.delete("id");

    const config = getConfig();
    return this.instance.patch(
      `/v1/profile/${profileId}/links/${linkId}`,
      formData,
      config
    );
  }

  /**
   * Delete custom Link with the ProfileId and id
   * @param {string} profileId * This is the profile Id
   * @param {string} id * This is the id for delete custom link
   */
  deleteCustomLink(profileId, id) {
    return this.instance.delete(`/v1/profile/${profileId}/links/${id}`);
  }
}

const profileService = new ProfileService();

export default profileService;
