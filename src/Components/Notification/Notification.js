import React from "react";
import PropTypes from "prop-types";
import { Alert, AlertIcon } from "@chakra-ui/core";

/*const StyledAlert = styled(Alert)`
  position: absolute;
  top: 50%;
  left: 50%;
`;*/

// DISPLAY NOTIFICATION MESSAGE - FUNCTION
const Notification = ({ message, status }) => {
  if (message === null) {
    return null;
  }
  return (
    <Alert status={status} data-cy="notification-message" position="absolute">
      <AlertIcon />
      {message}
    </Alert>
  );
};

/* <StyledAlert severity={severity} data-cy="notification-message">
    <span>{message}</span>
  </StyledAlert>*/

// PROPTYPES
Notification.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
};

export default Notification;
