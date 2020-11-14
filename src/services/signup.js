import axios from "axios";

/* AXIOS */

// baseUrl
const baseUrl = "/api/users";

// SIGNUP
const signUp = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default signUp;
