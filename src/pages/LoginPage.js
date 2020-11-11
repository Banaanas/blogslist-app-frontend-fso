import React from "react";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { pageTransition, pageVariants } from "../styles/animations";
import LoginForm from "../Components/Forms/LoginForm";

const LoginPage = () => {
  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <LoginForm />
    </StyledPageMain>
  );
};

export default LoginPage;
