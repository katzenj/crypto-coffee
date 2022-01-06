import React, { useState } from "react";
import styled from "styled-components";

const SubmitButton = styled.input`
  cursor: pointer;
  margin: 16px 4px 0px 4px;
  padding: 8px;
  border: 0;
  border-radius: 5px;
  background-color: whitesmoke;
  font-weight: 600;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: lightblue;
  }
`;

const InputContainer = styled.div`
  padding: 8px 8px 8px 0px;
`;
const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
`;
const InputLabel = styled.label`
  font-weight: 500;
  padding: 6px;
`;
const InputBox = styled.input`
  border-radius: 8px;
  border: 2px solid lightgray;
  height: 14px;
  margin: 0px 4px;
  padding: 8px;
`;

const MessageInput = ({ labelText, submitText, sendMessage }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    sendMessage(value);
    event.preventDefault();
    setValue("");
  };

  return (
    <InputContainer>
      <form onSubmit={onSubmit}>
        <InputBoxContainer>
          <InputLabel>{labelText}</InputLabel>
          <InputBox type="text" value={value} onChange={onChange} />
        </InputBoxContainer>
        <div>
          <SubmitButton type="submit" value={submitText} />
        </div>
      </form>
    </InputContainer>
  );
};

export default MessageInput;
