import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/core";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
  const history = useHistory();
  return (
    <Button
      onClick={() => history.goBack()}
      aria-label="Back to previous page"
      leftIcon={<IoMdArrowRoundBack />}
      variant="outline"
      size="lg"
      fontSize={20}
      py={10}
      mb={[10, 1, 0, 0]}
    >
      GO BACK
    </Button>
  );
};

export default BackButton;
