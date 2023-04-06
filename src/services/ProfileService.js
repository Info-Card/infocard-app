import ApiService from "./ApiService";
import FormDataFn from "helpers/FormDataFn";
import AddCustomFn from "helpers/AddCustomFn";

class ProfileService extends ApiService {
  /**
   * Update Profile with id and data
   * @param {string} id * This is the id of profile
   * @param {string} data * This is the data of new profile
   */
  updateProfile(id, data) {
    const { formData, config } = FormDataFn(data);
    return this.instance.patch(`profile/${id}`, formData, config);
  }

  /**
   * Update tag using id with data
   * @param {string} id * This is the id
   * @param {string} data * This is the data
   */
  update(id, data) {
    return this.instance.patch(`profile/${id}`, data);
  }

  /**
   * Exchange with profileId and data
   * @param {string} profileId * This is the ProfileId for exchange contact
   * @param {string} data * This is the data for exchange contact
   */
  exchangeContact(profileId, data) {
    return this.instance.post(`profile/exchange/${profileId}`, data);
  }
  /**
   * Add custom Link with id and data
   * @param {string} id * This is the id for add custom link
   * @param {string} data * This is the data
   */
  addCustomLink(id, data) {
    const { formData, config } = AddCustomFn(data);
    return this.instance.post(`profile/${id}/links/`, formData, config);
  }

  /**
   * Delete custom Link with the ProfileId and id
   * @param {string} profileId * This is the profile Id
   * @param {string} id * This is the id for delete custom link
   */
  deleteCustomLink(profileId, id) {
    return this.instance.delete(`profile/${profileId}/links/${id}`);
  }
}

const profileService = new ProfileService();

export default profileService;
