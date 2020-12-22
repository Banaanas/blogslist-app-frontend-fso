import { Spinner as ChakraUISpinner } from "@chakra-ui/react";

const Spinner = (props) => (
  <ChakraUISpinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
    aria-busy="true"
    {...props}
  />
);

export default Spinner;
