import axios from "axios";

// baseUrl
const baseUrl = "/api/blogs";

// SET TOKEN
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// GET ALL BLOGS ALL USERS
const getBlogsAllUsers = async () => {
  // (For example purpose, authentication has not been set for this route)
  const response = await axios.get(baseUrl);
  return response.data;
};

// GET SINGLE BLOG
const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// CREATE BLOG
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// UPDATE BLOG - For Authenticated Users - Not used in this App - Kept for example purpose
// --> Like Blog function also updates blog BUT without Authentication
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

// LIKE BLOG - // Unlike general Update, Blog Like is authorized without Authentication
const like = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/like/${id}`, newObject);
  return response.data;
};

// DELETE BLOG
const blogDelete = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export {
  setToken,
  getBlogsAllUsers,
  getBlog,
  create,
  update,
  like,
  blogDelete,
};
