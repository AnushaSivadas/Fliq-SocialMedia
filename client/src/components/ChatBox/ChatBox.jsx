import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import { createChat } from "../../api/ChatRequests";
import "./ChatBox.css";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FaVideo, FaPhone } from "react-icons/fa";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateImage(file)) {
        setSelectedImage(file);
      } else {
        // Show an error message or perform any other action for invalid image
        Swal.fire({
          icon: "error",
          title: "Invalid Image",
          text: "Please select a valid image file (JPEG, PNG, or GIF).",
        });
      }

      openModal();
    }
  };

  // Image validation function
  const validateImage = (img) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(img.type)) {
      return true;
    }
    return false;
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage || !newMessage.trim()) {
      return; // Do nothing if newMessage is empty
    }
    if (!chat._id) {
      const data = {
        senderId: currentUser,
        receiverId: chat.members.find((id) => id !== currentUser),
        text: newMessage,
      };
      const response = await createChat(data);
      chat = response.data;
      dispatch({ type: "SAVE_USER", data: chat });
    }
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div onClick={() => navigate(`/profile/${userData._id}`)}>
                  <img
                    src={
                      userData?.profilePicture
                        ? userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfilee.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              <div className="chat-header-icons">
                <FaPhone className="chat-header-icon" />
                <FaVideo className="chat-header-icon" />
              </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                style={{ display: "none" }}
                ref={imageRef}
                onChange={handleImageChange}
              />
            </div>

            {/* Modal for Image Preview */}
            {selectedImage && isModalOpen && (
              <div className="modal" onClick={closeModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="close-modal" onClick={closeModal}>
                    &times;
                  </span>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="selected-image"
                  />
                  <div className="caption-container">
                    {/* <input
          type="text"
          placeholder="Enter a caption..."
          className="caption-input"
        /> */}
                    <button className="send-button" onClick={handleSend}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
