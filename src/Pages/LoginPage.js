import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { pageTransition, pageVariants } from "../styles/animations";
import LoginForm from "../Components/Forms/LoginForm";
import SignupLink from "../Components/SignupLink";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginPage = () => {
  // SIDE MENU - REDUX STATE
  const isMenuOpen = useSelector((state) => state.sideMenu.isMenuOpen);

  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
      isMenuOpen={isMenuOpen}
    >
      <StyledContainer>
        <LoginForm />
        <SignupLink />
      </StyledContainer>
    </StyledPageMain>
  );
};

export default LoginPage;
