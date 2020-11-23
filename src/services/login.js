import axios from "axios";

/* AXIOS */

// baseUrl
const baseUrl = "/api/login";

// LOGIN
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default login;
