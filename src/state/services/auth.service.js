import api from './api';
import TokenService from './token.service';

class AuthService {
  login(creadentials) {
    return api.post('auth/login', creadentials).then((response) => {
      if (response.data) {
        TokenService.setAuthInfo(response.data);
        return response.data;
      } else {
        throw new Error('unauthorized');
      }
    });
  }

  register(creadentials) {
    return api.post('auth/register', creadentials).then((response) => {
      if (response.data) {
        TokenService.setAuthInfo(response.data);
        return response.data;
      } else {
        throw new Error('unauthorized');
      }
    });
  }

  logout() {
    TokenService.removeAuthInfo();
  }
}

export default new AuthService();
