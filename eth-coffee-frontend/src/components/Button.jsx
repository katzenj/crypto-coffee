import React from "react";

import "./Button.css";

export default Button = ({ disabled, onClick, children }) => {
  return (
    <button disabled={disabled} className="button" onClick={onClick}>
      {children}
    </button>
  );
};
