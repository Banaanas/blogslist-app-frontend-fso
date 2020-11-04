import { createStandaloneToast } from "@chakra-ui/core";

const toast = createStandaloneToast();

const displayToast = (title, description, status) => {
  return toast({
    title,
    description,
    status,
    duration: 9000000,
    isClosable: true,
  });
};

export default displayToast;
