import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  //   timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;