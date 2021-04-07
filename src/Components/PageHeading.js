import { Heading } from "@chakra-ui/react";

const PageHeading = (props) => (
  <Heading
    as="h1"
    size="2xl"
    pr="-1rem" /* To balance the last letter's letterSpacing */
    color="secondary.light"
    textTransform="uppercase"
    textAlign="center"
    backgroundColor="primary.dark"
    padding="1rem"
    borderRadius={8}
    letterSpacing="1rem"
    marginBottom="2rem"
    {...props}
  >
    {props.children}
  </Heading>
);

export default PageHeading;
