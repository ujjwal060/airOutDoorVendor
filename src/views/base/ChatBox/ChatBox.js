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
import EmojiPicker from 'emoji-picker-react'; // Correct import
import { FaSmile, FaPaperPlane } from 'react-icons/fa';
import { db } from './firebase'; // Import Firebase
import { ref, set, onValue } from 'firebase/database'; // Firebase methods
import './ChatSection.scss'; // Custom SCSS for extra styling

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessages, setNewMessages] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]); // State to store chat messages

  // Simulated chat data (vendor contacts)
  const chats = [
    { id: '6703965883b8a0adc3c8b8d9', name: 'Sumit', img: 'userImg1.png' }, // User's data
    { id: '2', name: 'Abhishek', img: 'userImg2.png' },
    { id: '3', name: 'Anmol', img: 'userImg3.png' },
    { id: '4', name: 'Akash', img: 'userImg4.png' },
  ];

  // Load chat messages for selected chat
  useEffect(() => {
    if (selectedChat) {
      const vendorId = localStorage.getItem('vendorId'); // Get the vendor's ID
      const chatRef = ref(db, `chats/${vendorId}`);

      onValue(chatRef, (snapshot) => {
        const messagesData = [];
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          // Check if the message is between the vendor and the selected user
          if (message.senderId === selectedChat.id || message.vendorId === selectedChat.id) {
            messagesData.push(message);
          }
        });
        setMessages(messagesData); // Update state with messages
      });
    }
  }, [selectedChat]);

  const handleNewMessage = (newMessage) => {
    setNewMessages((prevMessages) => ({
      ...prevMessages,
      [newMessage.id]: (prevMessages[newMessage.id] || 0) + 1,
    }));
    setToastData(newMessage);
    setShowToast(true);
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setNewMessages((prevMessages) => ({
      ...prevMessages,
      [chat.id]: 0,
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setCurrentMessage((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim()) {
      const vendorId = localStorage.getItem('vendorId');
      const messageId = new Date().getTime(); // Unique message ID based on timestamp
      const newMessageData = {
        text: currentMessage,
        senderId: vendorId, // Vendor is the sender
        vendorId: selectedChat.id, // User ID (from selected chat)
        timestamp: new Date().toISOString(),
      };

      // Save message to Firebase under a path that combines vendorId and userId
      const chatRef = ref(db, `chats/${vendorId}/${messageId}`);
      await set(chatRef, newMessageData);

      setCurrentMessage(''); // Clear input after sending
    }
  };

  return (
    <CRow>
      {/* Chat List Section */}
      <CCol md={5}>
        <CFormInput
          type="search"
          placeholder="Search by user name"
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
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${msg.senderId === localStorage.getItem('vendorId') ? 'sent' : 'received'}`}
                  >
                    <p>{msg.text}</p>
                    <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                ))}
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
                        handleSendMessage();
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
              <strong className="me-auto">New Message from {selectedChat?.name}</strong>
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
