import instance from "../config/axiosConfig";

class Auth {
  /**
   * LOGIN
   * @param {string} email - user email
   * @param {string} password - user password
   * @returns
   */
  static async login(email, password) {
    const data = {
      email,
      password,
    };
    const response = await instance.post("/api/login", data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  }

  /**
   *
   * @returns Object: { status: boolean, email: string, role: integer }
   */
  static async auth() {
    const response = await instance.get("/api/login/auth");

    return response.data;
  }
}

export default Auth;
