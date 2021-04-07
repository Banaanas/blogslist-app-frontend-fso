import displayToast from "./displayToast";
import store from "../store/store";
import { getAuthenticatedUser } from "../store/slices/authenticationSlice";
import { getBlogsSingleUser } from "../store/slices/blogsSingleUserSlice";
import login from "../services/login";
import * as blogService from "../services/blogs";
import * as userService from "../services/users";
import { getAllUsers } from "../store/slices/allUsersSlice";
import { getBlogsAllUsers } from "../store/slices/blogsAllUsersSlice";
import displayServerErrorToast from "./displayServerErrorToast";

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
  } catch (e) {
    // Display Warning Toast - Username or Password is Invalid
    const errorUsername = "Invalid Username";
    const errorPassword = "Invalid Password";

    // Check if 1 - e.response.data.error; 2 - e.response.data.error includes(errorWords)
    // Optional Chaining Operator
    if (e.response.data?.error.includes(errorUsername)) {
      displayToast("Wrong Credentials", "Invalid Username.", "warning");
    } else if (e.response.data?.error.includes(errorPassword)) {
      displayToast("Wrong Credentials", "Invalid Password.", "warning");
    } else {
      // Display Generic Server Error Toast
      displayServerErrorToast();
    }
  }
};

export default userLogin;
