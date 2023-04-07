import ApiService from "./ApiService";

class AuthService extends ApiService {
  /**
   * Logs in a user with the given email and password.
   * @param {string} email - The email of the user to login.
   * @param {string} password - The password of the user to login.
   * @returns {Promise} A promise that resolves with the server response data.
   */
  login(email, password) {
    console.log("in auth services");
    return this.instance.post(`/v1/auth/login`, { email, password });
  }

  /**
   * Registers a new user with the given email and password.
   * @param {string} email - The email of the user to register.
   * @param {string} password - The password of the user to register.
   * @returns {Promise} A promise that resolves with the server response data.
   */
  register(email, password) {
    return this.instance.post(`/v1/auth/register`, { email, password });
  }

  /**
   * Sends a password reset email to the user with the given email.
   * @param {string} email - The email of the user to send the password reset email to.
   * @returns {Promise} A promise that resolves with the server response data.
   */
  forgotPassword(email) {
    return this.instance.post(`/v1/auth/forgot-password`, { email });
  }

  /**
   * Resets the password of the user with the given token.
   * @param {string} token - The reset token sent to the user's email.
   * @param {string} password - The new password to set.
   * @returns {Promise} A promise that resolves with the server response data.
   */
  resetPassword(token, password) {
    return this.instance.post(`/v1/auth/reset-password?token=${token}`, {
      password,
    });
  }
}

const authService = new AuthService();

export default authService;
