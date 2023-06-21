import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { UilSearch } from "@iconscout/react-unicons";
import { useEffect } from "react";
import { findChat, userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getFollowedUserSearchData } from "../../api/UserRequests";
import SearchBar from "../../components/SearchBar/SearchBar";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { chattedUsers } = useSelector((state) => state.chatReducer.chatUsers);

  const [showSearch, setShowSearch] = useState(false);
  let [searchUsers, setSearchUsers] = useState(null);
  const [search, setSearch] = useState(null);
  const toggleVisibility = () => {
    setShowSearch(false);
  };
  

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        dispatch({type:"USER_LIST", data:data})
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  async function handleSubmit() {
    try {
      if(search){
      let response = await getFollowedUserSearchData(search, user._id);
      setSearchUsers(response.data);
      setShowSearch(true);
      }
      else{
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

  async function fetchChat(userId,oppUserId){
    
    const chat = await findChat(userId,oppUserId)
    console.log("chatttttttttt",chat)
    if(chat.data){
      setCurrentChat(chat.data)
    }else{
    setCurrentChat({ members: [userId, oppUserId] })

    }
   
  }

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          {/* <SearchBar/> */}

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
                <div
                  key={index}
                  onClick={() =>{
                    fetchChat(user._id, userr._id)
                    // setCurrentChat({ members: [user._id, userr._id] })
                  }
                  }
                >
                  <Conversation
                    toggleVisibility={toggleVisibility}
                    // handleClick={handleClick}
                    data={{ members: [user._id, userr._id] }}
                    currentUser={user._id}
                    online={checkOnlineStatus({
                      members: [user._id, userr._id],
                    })}
                  />
                </div>
              ))}
          </div>

          <div className="Chat-list">
            {chats.map((chat,index) => (
              <div key={index}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  toggleVisibility={toggleVisibility}
                  // handleClick={handleClick}
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
