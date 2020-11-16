import React from "react";
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
      /* eslint-disable react/jsx-props-no-spreading */
      {...props}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </Heading>
  );
};

export default PageHeading;
