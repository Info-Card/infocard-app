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

  forgotPassword(email) {
    return api.post('auth/forgot-password', { email });
  }

  resetPassword(token, password) {
    return api.post(`auth/reset-password?token=${token}`, { password });
  }

  logout() {
    TokenService.removeAuthInfo();
  }
}

export default new AuthService();
