import { Heading, Icon } from "@chakra-ui/react";
import { RiErrorWarningFill as NotFoundIcon } from "react-icons/ri";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { pageTransition, pageVariants } from "../styles/animations";
import HomePageButton from "../Components/HomePageButton";

const NotFoundPage = () => (
  <StyledPageMain
    variants={pageVariants}
    transition={pageTransition}
    initial="initial"
    animate="animate"
    exit="initial"
  >
    <HomePageButton />
    <Icon as={NotFoundIcon} boxSize={40} />
    <Heading> NOT FOUND</Heading>
  </StyledPageMain>
);

export default NotFoundPage;
