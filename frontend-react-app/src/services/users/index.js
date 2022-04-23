import instance from "../config/axiosConfig";

class Users {
  static async createUser(first_name, last_name, email, id_rol, password) {
    const data = {
      first_name,
      last_name,
      email,
      id_rol,
      password,
    };

    const response = await instance.post("/api/create-account", data);

    return response;
  }
}

export default Users;
