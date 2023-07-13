import React, { useState,useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequests";
import { findChat,createChat} from "../../api/ChatRequests";
import { addMessage } from "../../api/MessageRequests";


const Conversation = ({ data, currentUser, online,toggleVisibility,location,url}) => {
  // const { user } = useSelector((state) => state.authReducer.authData);
    const [userData, setUserData] = useState(null)
  const [currentChat, setCurrentChat] = useState(null);
  const dispatch = useDispatch();
  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
         setUserData(data)
        //  dispatch({type:"SAVE_USER", data:data})
      }
      catch(error)
      {
        console.log(error)
      }
    }

    if (data !== null) getUserData();
  }, [data,currentUser])

useEffect(()=>{
  const oppUserId = data.members.find((id)=>id!==currentUser)
  async function fetchChat() {
    const chat = await findChat(currentUser, oppUserId);
    if (chat.data) {
      setCurrentChat(chat.data);
    } else {
      setCurrentChat({ members: [currentUser, oppUserId] });
    }
  }
  fetchChat();
},[currentChat])



  const sharePost = async()=>{
    console.log(currentChat)
    if (!currentChat._id) {
      const data = {
        senderId: currentUser,
        receiverId: userData._id,
        text: url,
      };
      console.log("data",data)
      // const response = await createChat(data);
      const response="haiii"
      setCurrentChat(response);
      console.log("response",currentChat)
      dispatch({ type: "SAVE_USER", data: currentChat });
    }
    const message = {
      senderId: currentUser,
      text: url,
      receiverId:userData._id,
      chatId: currentChat._id,
    };
    
    try {
      await addMessage(message);
      
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div className="follower conversation"   
      onClick={()=>{
        toggleVisibility()
      }}   >
        
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.profilePicture? userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfilee.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
         {location==="shareModal" && ( <button className="shareButton"
          onClick={()=>sharePost()}>
            <AiOutlineSend color="white"/>
          </button>)}
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
