import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CBadge,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react';
import EmojiPicker from 'emoji-picker-react'; // Correctly import the default export
import { FaSmile, FaPaperPlane } from 'react-icons/fa';
import './ChatSection.scss'; // Custom SCSS for extra styling
import image8 from './img/image8.png'

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessages, setNewMessages] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Simulated chat data
  const chats = [
    { id: 1, name: 'Sumit', message: 'Hey! WhatsApp? how can I help you?', img: image8},
    { id: 2, name: 'Abhishek', message: 'Hey! WhatsApp? how can I help you?', img: image8 },
    { id: 3, name: 'Anmol', message: 'Hey! WhatsApp? how can I help you?', img: image8 },
    { id: 4, name: 'Akash', message: 'Hey! WhatsApp? how can I help you?', img: image8 },
  ];

  // Simulate message arrival (You can replace this with your own data fetching logic)
  useEffect(() => {
    const timer = setInterval(() => {
      const newMessage = {
        id: 2, // Simulating a new message for chat with id 2 (Abhishek)
        message: 'This is a new message!',
        time: new Date().toLocaleTimeString(),
      };
      handleNewMessage(newMessage);
    }, 10000); // Simulate new message every 10 seconds

    return () => clearInterval(timer);
  }, []);

  const handleNewMessage = (newMessage) => {
    // Update unread message count
    setNewMessages((prevMessages) => ({
      ...prevMessages,
      [newMessage.id]: (prevMessages[newMessage.id] || 0) + 1,
    }));

    // Show notification for new message
    setToastData({
      chatId: newMessage.id,
      message: newMessage.message,
      time: newMessage.time,
    });
    setShowToast(true);
  };

  const handleChatClick = (chat) => {
    // Clear unread messages for the selected chat
    setSelectedChat(chat);
    setNewMessages((prevMessages) => ({
      ...prevMessages,
      [chat.id]: 0, // Clear unread message count
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setCurrentMessage((prev) => prev + emoji.emoji); // Add emoji to message
    setShowEmojiPicker(false); // Close emoji picker after selecting
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      // Simulate sending the message (update the selected chat's message or log the message)
      console.log('Message sent:', currentMessage);
      setCurrentMessage(''); // Clear the input
    }
  };

  return (
    <CRow>
      {/* Chat List Section */}
      <CCol md={5}>
        <CFormInput
          type="search"
          placeholder="Search by host name"
          className="mb-3"
        />
        <CListGroup>
          {chats.map((chat) => (
            <CListGroupItem
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className="d-flex align-items-center chat-item"
            >
              <img
                src={chat.img}
                alt={chat.name}
                className="rounded-circle me-3"
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <strong>{chat.name}</strong>
                <p className="mb-3">{chat.message}</p>
              </div>
              {newMessages[chat.id] > 0 && (
                <CBadge color="danger" className="ms-auto">
                  {newMessages[chat.id]} new
                </CBadge>
              )}
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCol>

      {/* Chat Box Section */}
      <CCol md={7}>
        {selectedChat ? (
          <CCard>
            <CCardHeader>
              <h5>{selectedChat.name}</h5>
            </CCardHeader>
            <CCardBody>
              <div className="chat-messages">
                {/* Display chat messages dynamically */}
                <p>{selectedChat.message}</p>
              </div>
              <div className="chat-input-wrapper">
                <div className="chat-input d-flex align-items-center">
                  <FaSmile
                    size={28}
                    className="emoji-icon me-2"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                  <CFormInput
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="me-2"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(); // Send message on Enter key press
                      }
                    }}
                  />
                  <CButton color="warning" onClick={handleSendMessage}>
                    <FaPaperPlane size={20} />
                  </CButton>
                </div>
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <EmojiPicker
                      onEmojiClick={handleEmojiSelect}
                      disableSearchBar
                      width="550px"
                    />
                  </div>
                )}
              </div>
            </CCardBody>
          </CCard>
        ) : (
          <CCard>
            <CCardBody>
              <p>Please select a chat to start messaging.</p>
            </CCardBody>
          </CCard>
        )}
      </CCol>

      {/* Toast Notification */}
      {showToast && toastData && (
        <CToaster position="top-end">
          <CToast autohide={true} visible={true} className="bg-info text-white">
            <CToastHeader closeButton>
              <strong className="me-auto">New Message from {chats.find(chat => chat.id === toastData.chatId)?.name}</strong>
              <small>{toastData.time}</small>
            </CToastHeader>
            <CToastBody>{toastData.message}</CToastBody>
          </CToast>
        </CToaster>
      )}
    </CRow>
  );
};

export default ChatSection;
 