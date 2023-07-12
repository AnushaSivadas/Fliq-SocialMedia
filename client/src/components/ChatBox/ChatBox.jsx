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
import * as UploadApi from "../../api/UploadRequest";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newPreviewMessage, setNewPreviewMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setNewPreviewMessage("");
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

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      setSelectedVideo(file);    

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
  const handlePreviewChange = (newMessage) => {
    setNewPreviewMessage(newMessage);
  };

  const handlePlusIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClick = (option) => {
   if(option==="Image"){
      imageRef.current.click()
   }else if(option==="Video"){
    videoRef.current.click();
   }
    setAnchorEl(null); // Close the menu
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
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageSend = async (e) => {
    e.preventDefault();

    if (!chat._id) {
      let data = {
        senderId: currentUser,
        receiverId: chat.members.find((id) => id !== currentUser),
        // text: newMessage,
      };
      if (newPreviewMessage) {
        data.text = newPreviewMessage;
      }
      const response = await createChat(data);
      chat = response.data;
      dispatch({ type: "SAVE_USER", data: chat });
    }
    let message = {
      senderId: currentUser,

      chatId: chat._id,
    };
    if (newPreviewMessage) {
      message.text = newPreviewMessage;
    }
    const receiverId = chat.members.find((id) => id !== currentUser);
    if (selectedImage) {
      const formData = new FormData();
      const fileName = Date.now() + selectedImage.name;
      formData.append("name", fileName);
      formData.append("file", selectedImage);

      // Upload the image and get the image URL
      try {
        const imageUrl = await UploadApi.uploadImage(formData);
        message.image = imageUrl.data;
      } catch (error) {
        console.log(error);
        // Show an error message if image upload fails
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Failed to upload the selected image. Please try again.",
        });
        return;
      }
    }
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewPreviewMessage("");
    } catch {
      console.log("error");
    }
    closeModal();
  };

  const handleVideoSend = async (e) => {
    e.preventDefault();

    if (!chat._id) {
      let data = {
        senderId: currentUser,
        receiverId: chat.members.find((id) => id !== currentUser),
        // text: newMessage,
      };
      if (newPreviewMessage) {
        data.text = newPreviewMessage;
      }
      const response = await createChat(data);
      chat = response.data;
      dispatch({ type: "SAVE_USER", data: chat });
    }
    let message = {
      senderId: currentUser,

      chatId: chat._id,
    };
    if (newPreviewMessage) {
      message.text = newPreviewMessage;
    }
    const receiverId = chat.members.find((id) => id !== currentUser);
    if (selectedVideo) {
      const formData = new FormData();
      const fileName = Date.now() + selectedVideo.name;
      formData.append("name", fileName);
      formData.append("file", selectedVideo);

      // Upload the Video and get the Video URL
      try {
        const videoUrl = await UploadApi.uploadVideo(formData);
        message.video = videoUrl.data;
      } catch (error) {
        console.log(error);
        // Show an error message if image upload fails
        Swal.fire({
          icon: "error",
          title: "Video Upload Failed",
          text: "Failed to upload the selected video. Please try again.",
        });
        return;
      }
    }
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewPreviewMessage("");
    } catch {
      console.log("error");
    }
    closeModal();
  };

  const navigateToProfile = (profileUserId) => {
    navigate("/profile", { state : { profileUserId } });
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div 
        onClick={ ()=>navigateToProfile(userData._id)}
        >
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
                    <span style={{marginLeft:"1rem",marginTop:"3px",cursor:"pointer"}}>{userData?.username}</span>

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
                    {" "}
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Chat"
                        className="message-image"
                      />
                    )}
                    {message.video && (
                      <video
                        src={message.video}
                        alt="Chat"
                        className="message-image"
                        controls
                      />
                    )}
                    {message.text && <span>{message.text}</span>}
                    <span className="chatTime">{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              {/* <div onClick={() => imageRef.current.click()}>+</div> */}
              <div className={`plus-icon`} onClick={handlePlusIconClick}>
                +
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={() => handleOptionClick("Image")}>Image</MenuItem>
                <MenuItem onClick={() => handleOptionClick("Video")}>Video</MenuItem>
              </Menu>
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
            <input
                type="file"
                name=""
                id=""
                accept="video/*"
                style={{ display: "none" }}
                ref={videoRef}
                onChange={handleVideoChange}
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
                    {
                     
                      <InputEmoji
                        value={newPreviewMessage}
                        onChange={handlePreviewChange}
                      />
                    }
                    <button className="send-button" onClick={handleImageSend}>
                      Send
                    </button>
                  </div>
                 
                </div>
              </div>
            )}

            {/* Modal for Video Preview */}
            {selectedVideo && isModalOpen && (
              <div className="modal" onClick={closeModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="close-modal" onClick={closeModal}>
                    &times;
                  </span>
                  <video
                    src={URL.createObjectURL(selectedVideo)}
                    alt="Selected"
                    className="selected-image"
                    controls
                  />
                  <div className="caption-container">
                    {
                     
                      <InputEmoji
                        value={newPreviewMessage}
                        onChange={handlePreviewChange}
                      />
                    }
                    <button className="send-button" onClick={handleVideoSend}>
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
