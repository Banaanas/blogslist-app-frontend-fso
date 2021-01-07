import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { pageTransition, pageVariants } from "../styles/animations";
import SignUpForm from "../Components/Forms/SignUpForm";
import { useSelector } from "react-redux";

const SignUpPage = () => {
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
      <SignUpForm />
    </StyledPageMain>
  );
};

export default SignUpPage;
