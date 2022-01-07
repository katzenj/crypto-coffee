import React, { useState } from "react";

import CoffeeCard from "./CoffeeCard";

import "./MessagesContainer.css";

const MessagesContainer = ({ messages }) => {
  const [expanded, setExpanded] = useState(false);
  const getChevron = () => {
    if (expanded) {
      return <i className="fas fa-chevron-down"></i>;
    }
    return <i className="fas fa-chevron-right"></i>;
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="messages-title">
        <b>Messages</b>
        <button
          className="chevron-button"
          onClick={() => setExpanded(!expanded)}
        >
          {getChevron()}
        </button>
      </div>
      {expanded &&
        messages.map((m) => {
          return <CoffeeCard key={m.from} data={m} />;
        })}
    </div>
  );
};

export default MessagesContainer;
