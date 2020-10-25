import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";

import login from "../services/login";
import blogService from "../services/blogs";
import userService from "../services/users";
import actionCreators from "../store/actions/action-creators";

const StyledMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 8rem; /* To match the Fixed Header Height */
  padding: 4rem;
  font-size: 2rem;
`;

const LoginForm = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // STATE - LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // SET USERNAME LOGIN - FUNCTION
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // SET PASSWORD LOGIN - FUNCTION
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // LOGIN - FUNCTION
  const handleLogin = async (event) => {
    event.preventDefault();

    const userObject = {
      username,
      password,
    };

    try {
      // Store user in localStorage
      const user = await login(userObject);
      window.localStorage.setItem(
        "loggedBlogslistappUser",
        JSON.stringify(user),
      );

      // Reinitialize Inputs
      setUsername("");
      setPassword("");

      // Set Token for Axios Requests
      blogService.setToken(user.token);
      userService.setToken(user.token);

      // Get all Users - Dispatch - Redux State
      dispatch(actionCreators.getAllUsers());

      // Get loggedInUser - Dispatch - Redux State
      dispatch(actionCreators.loggedInUser(user));

      // Get blogsAllUsers - Dispatch - Redux State
      dispatch(actionCreators.getBlogsAllUsers());

      // Get allBlogsSingleUser - Dispatch - Redux State
      dispatch(actionCreators.getBlogsSingleUser(user.id));

      dispatch(actionCreators.displayNotification("success", "Login Success"));
    } catch (error) {
      dispatch(
        actionCreators.displayNotification("warning", "Wrong Credentials"),
      );
    }
  };

  return (
    <StyledMain>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            data-cy="username-input"
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            data-cy="password-input"
          />
        </div>
        <button type="submit" data-cy="login-button">
          LOGIN
        </button>
      </form>
    </StyledMain>
  );
};

export default LoginForm;
