import { useState } from "react";
import styled from "@emotion/styled";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import userLogin from "../../utils/userLogin";

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
  // STATE - LOGIN
  // New Users can test the App with test-account and password as initial value
  const [username, setUsername] = useState("Test-Account");
  const [password, setPassword] = useState("password");

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

    // Reinitialize Inputs (Before userLogin() - Component Unmount)
    setUsername("");
    setPassword("");

    // userLogin - Async Function
    await userLogin(username, password);

    // Then, LoginPage is Redirected to MyProfilePage by Router
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
