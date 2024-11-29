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
  CSpinner,
} from '@coreui/react';
import EmojiPicker from 'emoji-picker-react';
import { FaSmile, FaPaperPlane } from 'react-icons/fa';
import { db } from './firebase';
import { ref, set, onValue, push } from 'firebase/database';
import './ChatSection.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatSection = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessages, setNewMessages] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorId = localStorage.getItem('vendorId');

  useEffect(() => {
    const chatMetadataRef = ref(db, `chatMetadata`);
    const unsubscribe = onValue(chatMetadataRef, (snapshot) => {
      const chatsData = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        chatsData.push({ id: childSnapshot.key, ...data });
      });
      chatsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const userIds = chatsData.map((chat) => chat.userId);
      const uniqueUserIds = [...new Set(userIds)];

      axios
        .post('http://44.196.64.110:8000/vendor/getUsers', { userIds: uniqueUserIds })
        .then((response) => {
          const enrichedChatsData = chatsData.map((chat) => {
            const user = response.data.data.find((user) => user._id === chat.userId);
            return { ...chat, userName: user?.fullName, userImage: user?.imageUrl };
          });
          setChats(enrichedChatsData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast.error(error.response?.message);
        })
        .finally(() => {
          setLoading(false);
        });
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
          setMessages([]);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedChat, vendorId]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim()) {
      const newMessageData = {
        text: currentMessage,
        senderId: vendorId,
        timestamp: new Date().toISOString(),
      };

      const chatRef = ref(db, `chats/${selectedChat.userId}${vendorId}`);
      await push(chatRef, newMessageData);

      const chatMetadataRef = ref(db, `chatMetadata/${selectedChat.userId}_${vendorId}`);
      const chatMetadata = {
        userId: selectedChat.userId,
        vendorId: vendorId,
        lastMessage: currentMessage,
        timestamp: newMessageData.timestamp,
      };
      await set(chatMetadataRef, chatMetadata);

      setCurrentMessage('');
    }
  };

  return (
    <CRow>
      {loading && (
        <div className="loader-overlay">
          <CSpinner className="loader" />
        </div>
      )}

      <CCol md={5}>
        <CListGroup>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <CListGroupItem
                key={chat.c}
                onClick={() => handleChatClick(chat)}
                className="d-flex align-items-center chat-item"
              >
                <img
                  src={chat.userImage || 'defaultImg.png'}
                  alt={chat.userName || 'User'}
                  className="rounded-circle me-3"
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <strong>{chat.userName || 'Unknown User'}</strong>
                  <p>{chat.lastMessage}</p>
                </div>
                {newMessages[chat.id] > 0 && (
                  <CBadge color="danger" className="ms-auto">
                    {newMessages[chat.id]} new
                  </CBadge>
                )}
              </CListGroupItem>
            ))
          ) : (
            <CListGroupItem>No chats available</CListGroupItem>
          )}
        </CListGroup>
      </CCol>

      <CCol md={7}>
        {selectedChat ? (
          <CCard>
            <CCardHeader>
              <h5>{selectedChat.userName || 'Unknown User'}</h5>
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
                      onEmojiClick={(e, emojiObject) =>
                        setCurrentMessage((prev) => prev + emojiObject.emoji)
                      }
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
      <ToastContainer />
    </CRow>
  );
};

export default ChatSection;
 