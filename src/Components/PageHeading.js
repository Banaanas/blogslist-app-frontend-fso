import React from "react";
import { Heading } from "@chakra-ui/core";

const PageHeading = (props) => {
  return (
    <Heading
      as="h1"
      mb="2rem"
      size="4xl"
      ls="1rem"
      letterSpacing="1rem"
      textTransform="uppercase"
      align="center"
      color="secondary.dark"
      /* eslint-disable react/jsx-props-no-spreading */
      {...props}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </Heading>
  );
};

export default PageHeading;
