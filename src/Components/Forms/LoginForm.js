import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/core";
import blogService from "../../services/blogs";
import userService from "../../services/users";
import actionCreators from "../../store/actions/action-creators";
import login from "../../services/login";
import getToast from "../../utils/displayToast";

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

  const toast = useToast();

  // LOGIN - FUNCTION
  const handleLogin = async (event) => {
    event.preventDefault();
    getToast();

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



      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })


      dispatch(actionCreators.displayNotification("success", "Login Success"));
    } catch (error) {
      dispatch(
        actionCreators.displayNotification("warning", "Wrong Credentials"),
      );
    }
  };

  return (
    <StyledForm onSubmit={handleLogin}>
      <FormControl isRequired>
        <FormLabel htmlFor="username" fontSize="2rem">
          Username
        </FormLabel>
        <Input
          type="text"
          value={username}
          id="username"
          onChange={handleUsernameChange}
          data-cy="username-input"
          size="xl"
          px={2}
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
          id="password"
          onChange={handlePasswordChange}
          data-cy="password-input"
          size="xl"
          px={2}
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
  );
};

export default LoginForm;
