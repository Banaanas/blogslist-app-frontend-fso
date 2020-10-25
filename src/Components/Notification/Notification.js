import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/core/Alert";
import { Typography } from "@material-ui/core";
import styled from "@emotion/styled";

const StyledAlert = styled(Alert)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

// DISPLAY NOTIFICATION MESSAGE - FUNCTION
const Notification = ({ message, severity }) => {
  if (message === null) {
    return null;
  }
  return (
    <StyledAlert severity={severity} data-cy="notification-message">
      <Typography>{message}</Typography>
    </StyledAlert>
  );
};

// PROPTYPES
Notification.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string,
};

export default Notification;
