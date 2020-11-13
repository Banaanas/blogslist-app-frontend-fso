import displayToast from "./displayToast";
import store from "../store/store";
import { resetAuthenticatedUser } from "../store/slices/AuthenticationSlice";
import { resetblogsSingleUser } from "../store/slices/blogsSingleUserSlice";

// LOGOUT - FUNCTION
const handleLogOut = () => {
  // Clear localStorage
  window.localStorage.clear(); // Clear localStorage

  // Reset Authenticated User / blogsSingleUser - Dispatch - Redux State
  // Store imported to use Dispatch outside of a Component
  store.dispatch(resetAuthenticatedUser());
  store.dispatch(resetblogsSingleUser());

  // Display Success Toast
  displayToast(
    "👋 Logout Successful 💖",
    "You have been successfully logged out.",
    "success",
  );
};

export default handleLogOut;
