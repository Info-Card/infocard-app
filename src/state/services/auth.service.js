import api from './api';

class AuthService {
  resetPassword(token, password) {
    return api.post(`auth/reset-password?token=${token}`, { password });
  }
}

export default new AuthService();
