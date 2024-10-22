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
import EmojiPicker from 'emoji-picker-react';
import { FaSmile, FaPaperPlane } from 'react-icons/fa';
import { db } from './firebase'; // Make sure you have this configured correctly
import { ref, set, onValue, push } from 'firebase/database';
import './ChatSection.scss';

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessages, setNewMessages] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  const vendorId = localStorage.getItem('vendorId');

  useEffect(() => {
    // Fetch chat metadata to set the chat list dynamically
    const chatMetadataRef = ref(db, `chatMetadata`);
    const unsubscribe = onValue(chatMetadataRef, (snapshot) => {
      const chatsData = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        chatsData.push({ id: childSnapshot.key, ...data });
      });
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    if (selectedChat) {
      const chatRef = ref(db, `chats/${selectedChat.userId}${vendorId}`);
      const unsubscribe = onValue(chatRef, (snapshot) => {
        const messagesData = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            messagesData.push(message);
          });
          setMessages(messagesData);
        } else {
          setMessages([]); // Clear messages if none found
        }
      });

      return () => unsubscribe();
    }
  }, [selectedChat, vendorId]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages([]); // Clear previous messages on new chat selection
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim()) {
      const newMessageData = {
        text: currentMessage,
        senderId: vendorId,
        timestamp: new Date().toISOString(),
      };

      // Push the new message to the chat
      const chatRef = ref(db, `chats/${selectedChat.userId}${vendorId}`);
      await push(chatRef, newMessageData);

      // Update chat metadata with the last message
      const chatMetadataRef = ref(db, `chatMetadata/${selectedChat.userId}_${vendorId}`);
      const chatMetadata = {
        userId: selectedChat.userId,
        vendorId: vendorId,
        lastMessage: currentMessage,
        timestamp: newMessageData.timestamp,
      };
      await set(chatMetadataRef, chatMetadata);

      setCurrentMessage('');
      // Optionally show a toast notification for the new message
      setShowToast(true);
      setToastData({ message: currentMessage, time: new Date().toLocaleTimeString() });
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
              key={chat.userId}
              onClick={() => handleChatClick(chat)}
              className="d-flex align-items-center chat-item"
            >
              <img
                src={chat.img || 'defaultImg.png'} // Add a default image
                alt={chat.userId}
                className="rounded-circle me-3"
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <strong>{chat.userId}</strong>
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
              <h5>{selectedChat.userId}</h5>
            </CCardHeader>
            <CCardBody>
              <div className="chat-messages">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`message ${msg.senderId === vendorId ? 'sent' : 'received'}`}
                    >
                      <p>{msg.text}</p>
                      <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                    </div>
                  ))
                ) : (
                  <p>No messages to display.</p>
                )}
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
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <EmojiPicker
                      onEmojiClick={(e, emojiObject) => setCurrentMessage((prev) => prev + emojiObject.emoji)}
                      disableSearchBar
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
              <strong className="me-auto">New Message from {selectedChat?.userId}</strong>
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
