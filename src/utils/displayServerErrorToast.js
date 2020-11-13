import { createStandaloneToast } from "@chakra-ui/core";

const toast = createStandaloneToast();

const displayServerErrorToast = () => {
  return toast({
    title: "Server Error.",
    description: "Something went wrong with the Server",
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

export default displayServerErrorToast;
