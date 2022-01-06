import React, { useState } from "react";

import "./MessageInput.css";

const MessageInput = ({ labelText, value, setValue }) => {
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    sendMessage(value);
    event.preventDefault();
    setValue("");
  };

  return (
    <div className="input-container">
      <form onSubmit={onSubmit}>
        <div className="input-box-container">
          <label className="input-label">{labelText}</label>
          <input
            className="input-box"
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
