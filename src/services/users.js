import axios from "axios";

/* AXIOS */

// baseUrl
const baseUrl = "/api/users";

// SET TOKEN
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// GET ALL USERS
const getAllUsers = async () => {
  // (For example purpose, authentication has not been set for this route)
  const response = await axios.get(baseUrl);
  return response.data;
};

// GET SINGLE USER
const getUser = async (userID) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseUrl}/${userID}`, config);
  return response.data;
};

export default { getAllUsers, getUser, setToken };
