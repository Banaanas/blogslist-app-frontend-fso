import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { pageTransition, pageVariants } from "../styles/animations";
import SignUpForm from "../Components/Forms/SignUpForm";

const SignUpPage = () => {
  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <SignUpForm />
    </StyledPageMain>
  );
};

export default SignUpPage;
