import { Heading, Icon } from "@chakra-ui/react";
import { RiErrorWarningFill as NotFoundIcon } from "react-icons/ri";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { pageTransition, pageVariants } from "../styles/animations";
import BackButton from "../Components/BackButton";

const NotFoundPage = () => {
  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <BackButton />
      <Icon as={NotFoundIcon} boxSize={40} />
      <Heading> NOT FOUND</Heading>
    </StyledPageMain>
  );
};

export default NotFoundPage;
