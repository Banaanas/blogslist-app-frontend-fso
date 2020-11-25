import { Heading } from "@chakra-ui/react";

const PageHeading = (props) => {
  return (
    <Heading
      as="h1"
      size="2xl"
      mr="-1rem" /* To balance the last letter's letterSpacing */
      color="secondary.dark"
      textTransform="uppercase"
      textAlign="center"
      letterSpacing="1rem"
      {...props}
    >
      {props.children}
    </Heading>
  );
};

export default PageHeading;
