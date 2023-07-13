import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { UilSearch } from "@iconscout/react-unicons";
import { Modal, useMantineTheme } from "@mantine/core";
import Conversation from "../Coversation/Conversation";
import { getFollowedUserSearchData } from "../../api/UserRequests";
import { userChats } from "../../api/ChatRequests";
import "./ChatShare.css"
import { FaTelegram,FaInstagram,FaWhatsapp } from "react-icons/fa";


const ChatShareModal = ({ chatShareOpen, setChatShareOpen,url,data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [showSearch, setShowSearch] = useState(false);
  let [searchUsers, setSearchUsers] = useState(null);
  const [search, setSearch] = useState(null);
  const [chats, setChats] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        dispatch({ type: "USER_LIST", data: data });
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // const navigateToChat = (userId) => {
  //   navigate("/chat", { state: { userId } });
  // };

  const toggleVisibility = () => {
    setShowSearch(false);
  };

  async function handleSubmit() {
    try {
      if (search) {
        let response = await getFollowedUserSearchData(search, user._id);
        setSearchUsers(response.data);
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.message);
      } else {
        console.log(error.messag, "error connection");
      }
    }
  }
  const handleWhatsAppShare = () => {
    // Logic to share content to WhatsApp
    const message = `Check out this post: ${url}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const handleInstagramShare = () => {
    // Logic to share content to Instagram
    const instagramURL = `https://www.instagram.com/?url=${url}`;
    window.open(instagramURL, "_blank");
  };

  const handleTelegramShare = () => {
    // Logic to share content to Telegram
    const message = `Check out this post: ${url}`;
    const encodedMessage = encodeURIComponent(message);
    const telegramURL = `https://t.me/share/url?url=${encodedMessage}`;
    window.open(telegramURL, "_blank");
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      // size="50%"
      fullscreen
      opened={chatShareOpen}
      onClose={() => setChatShareOpen(false)}
    >
      <div className="Chat-container shareModal">
        <h2>Chats</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="search-bar">
            <input
              className="search-input"
              id="search"
              type="text"
              placeholder="Search"
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-button">
              <UilSearch size="15" fill="gray" />
            </button>
          </div>
        </form>

        <div className="Chat-list">
          {showSearch &&
            searchUsers.map((userr, index) => (
              <div key={index}
              //  onClick={() => navigateToChat(userr._id)}
              >
                <Conversation
                  toggleVisibility={toggleVisibility}
                  data={{ members: [user._id, userr._id] }}
                  currentUser={user._id}
                  location="shareModal"
                  url={url}
                  postData={data}
                  setChatShareOpen={setChatShareOpen}
                />
              </div>
            ))}
        </div>

        <div className="Chat-list">
          {chats.map((chat, index) => (
            <div key={index} 
            // onClick={() => navigateToChat(chat.members[1])}
            >
              <Conversation
                toggleVisibility={toggleVisibility}
                data={chat}
                currentUser={user._id}
                location="shareModal"
                url={url}
                postData={data}
                setChatShareOpen={setChatShareOpen}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="share-options">
        <button className="share-button" onClick={handleWhatsAppShare}>
          <FaWhatsapp className="share-icon" style={{color:"green"}}/>
          <span className="share-label"> WhatsApp</span>
        </button>
        <button className="share-button" onClick={handleInstagramShare}>
          <FaInstagram className="share-icon" style={{color:"purple"}}/>
          <span className="share-label"> Instagram</span>
        </button>
        <button className="share-button" onClick={handleTelegramShare}>
          <FaTelegram className="share-icon" style={{color:"blue"}}/>
          <span className="share-label"> Telegram</span>
        </button>
        {/* Add other share options as needed */}
      </div>

      <br />
      <br />
    </Modal>
  );
};

export default ChatShareModal;
