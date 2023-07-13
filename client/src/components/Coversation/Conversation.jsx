import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { getUser } from "../../api/UserRequests";
import { findChat, createChat } from "../../api/ChatRequests";
import { addMessage } from "../../api/MessageRequests";
import Swal from "sweetalert2";


const Conversation = ({
  data,
  currentUser,
  online,
  toggleVisibility,
  location,
  url,
  setChatShareOpen,
  postData
}) => {

  const [userData, setUserData] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (data !== null) getUserData();
  }, [data, currentUser]);

  useEffect(() => {
    const oppUserId = data.members.find((id) => id !== currentUser);
    async function fetchChat() {
      const chat = await findChat(currentUser, oppUserId);
      if (chat.data) {
        setCurrentChat(chat.data);
      } else {
        setCurrentChat({ members: [currentUser, oppUserId] });
      }
    }
    fetchChat();
  }, [currentChat]);

  const sharePost = async () => {
    let chatData = null;
    if (!currentChat._id) {
      const data = {
        senderId: currentUser,
        receiverId: userData._id,
      };
      const response = await createChat(data);
      chatData = response.data;
      setCurrentChat(response);
    }
    const message = {
      senderId: currentUser,
      text: url,
      receiverId: userData._id,
      chatId: chatData?._id || currentChat?._id,
    };
    if(postData.image)
    message.image=postData.image
    
    if(postData.video)
    message.video=postData.video

    if(postData.desc)
    message.desc=postData.desc

    try {
      await addMessage(message);
      Swal.fire({
        title: "Success",
        text: "Post shared successfully",
        icon: "success",
      });
    } catch (error) {
      console.log("error", error);
    }
    setChatShareOpen(false)
  };

  return (
    <>
      <div
        className="follower conversation"
        onClick={() => {
          toggleVisibility();
        }}
      >
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfilee.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span style={{ fontSize: "0.8rem" }}>{userData?.username} </span>
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
          </div>
        </div>
        {location === "shareModal" && (
          <button className="shareButton" onClick={() => sharePost()}>
            <AiOutlineSend color="white" />
          </button>
        )}
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
