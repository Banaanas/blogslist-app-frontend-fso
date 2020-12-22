import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

const displayToast = (title, description, status) =>
  toast({
    title,
    description,
    status,
    duration: 9000,
    isClosable: true,
  });

export default displayToast;
