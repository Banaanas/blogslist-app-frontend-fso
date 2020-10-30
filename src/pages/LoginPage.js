import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";
import blogService from "../services/blogs";
import userService from "../services/users";
import login from "../services/login";
import actionCreators from "../store/actions/action-creators";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: 10px;
  box-shadow: -3px 0 10px 0 ${({ theme }) => theme.colors.primary.dark};
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
    <StyledPageMain>
      <Input />
      <StyledForm onSubmit={handleLogin}>
        <FormControl isRequired>
          <FormLabel htmlFor="username" fontSize="2rem">
            Username
          </FormLabel>
          <Input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            aria-describedby="username-text"
            data-cy="username-input"
            size="lg"
            bg="secondary.light"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel
            htmlFor="password"
            fontSize="2rem"
            value={password}
            onChange={handlePasswordChange}
            data-cy="password-input"
          >
            Password
          </FormLabel>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
            aria-describedby="password-text"
            data-cy="password-input"
            size="xl"
            bg="secondary.light"
          />
        </FormControl>
        <Button
          type="submit"
          size="xl"
          mt={10}
          py={2}
          width="full"
          bg="primary.dark"
          color="secondary.dark"
          data-cy="login-button"
        >
          LOGIN
        </Button>
      </StyledForm>
    </StyledPageMain>
  );
};

export default LoginForm;
