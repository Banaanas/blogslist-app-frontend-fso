import { useSelector } from "react-redux";
import { Heading, Icon } from "@chakra-ui/react";
import { RiErrorWarningFill as NotFoundIcon } from "react-icons/ri";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { pageTransition, pageVariants } from "../styles/animations";
import HomePageButton from "../Components/HomePageButton";

const NotFoundPage = () => {
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
      <HomePageButton />
      <Icon as={NotFoundIcon} boxSize={40} />
      <Heading> NOT FOUND</Heading>
    </StyledPageMain>
  );
};

export default NotFoundPage;
