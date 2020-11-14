import displayToast from "./displayToast";
import store from "../store/store";
import { getAuthenticatedUser } from "../store/slices/AuthenticationSlice";
import { getBlogsSingleUser } from "../store/slices/blogsSingleUserSlice";
import login from "../services/login";
import blogService from "../services/blogs";
import userService from "../services/users";
import { getAllUsers } from "../store/slices/allUsersSlice";
import { getBlogsAllUsers } from "../store/slices/blogsAllUsersSlice";

// LOGIN - FUNCTION
const userLogin = async (username, password) => {
  const userObject = {
    username,
    password,
  };

  try {
    // User Login - Async Function
    const user = await login(userObject);

    // Store user in localStorage
    window.localStorage.setItem("authenticatedUser", JSON.stringify(user));

    // Set Token for Axios Requests
    blogService.setToken(user.token);
    userService.setToken(user.token);

    // Store imported to use Dispatch outside of a Component
    // Get all Users - Dispatch - Redux State
    store.dispatch(getAllUsers());

    // Get Authenticated User - Dispatch - Redux State
    store.dispatch(getAuthenticatedUser(user));

    // Get blogsAllUsers - Dispatch - Redux State
    store.dispatch(getBlogsAllUsers());

    // Get allBlogsSingleUser - Dispatch - Redux State
    store.dispatch(getBlogsSingleUser(user.id));

    // Display Success Toast
    displayToast(
      "🙂 Login Successful 🏠",
      "You are connected to the Application.",
      "success",
    );
  } catch (error) {
    // Display Error Toast
    displayToast(
      "Login Failed.",
      "You are not connected to the Application.",
      "error",
    );
  }
};

export default userLogin;
