import React from 'react';
import { CListGroup, CListGroupItem, CButton } from '@coreui/react';

const MessageList = ({ messages = [], onSelectChat }) => {
  if (!Array.isArray(messages)) {
    return <p>No messages available.</p>;
  }

  return (
    <CListGroup>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <CListGroupItem
            key={index}
            onClick={() => onSelectChat(msg)}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{msg.sender}</strong>
              <p className="mb-0">{msg.lastMessage}</p>
            </div>
            <CButton color="primary" variant="ghost">Open Chat</CButton>
          </CListGroupItem>
        ))
      ) : (
        <p>No messages available.</p>
      )}
    </CListGroup>
  );
};

export default MessageList;
