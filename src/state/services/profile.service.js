import api from './api';

class ProfileService {
  updateProfile(id, data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key === 'image') {
        if (value && value[0]) {
          formData.append('image', value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });
    return api.patch(`profile/${id}`, formData, config);
  }

  updateVideos(id, data) {
    return api.patch(`profile/${id}`, data);
  }

  exchangeContact(profileId, data) {
    return api.post(`profile/exchange/${profileId}`, data);
  }
}

export default new ProfileService();
