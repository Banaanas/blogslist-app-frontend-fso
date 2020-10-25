import React, { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ buttonLabel, children }) => {

  // STATE - VISIBLE
  const [visible, setVisible] = useState(false);

  // INLINE STYLE
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  // TOGGLE VISIBILITY - FUNCTION
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>CANCEL</button>
      </div>
    </div>
  );
};

// PROPTYPES
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Togglable;
