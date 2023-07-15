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
    }import UserModel from "../models/userModel.js";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";
    import jwt_decode from "jwt-decode";
    import TokenModel from "../models/tokenModel.js";
    import { sendEmail } from "../utils/sendEmail.js";
    import crypto from "crypto"
    
    // Register new user
    export const registerUser = async (req, res) => {
    
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPass;
      const newUser = new UserModel(req.body);
      const { username, email } = req.body;
      try {
        // addition new
        const usernameUser = await UserModel.findOne({ username });
        const emailUser = await UserModel.findOne({ email });
    
        if (usernameUser) return res.status(400).json("Username already exists");
    
        if (emailUser) return res.status(400).json("Email already exists");
    
        // changed
        const user = await newUser.save();
        const mailToken = await TokenModel({
          userId:user._id,
          token:crypto.randomBytes(32).toString("hex")
        }).save();
    
        const url = `${process.env.BASE_URL}auth/${user._id}/verify/${mailToken.token}`
        await sendEmail(user.email,"Verify Email",url);
        // const token = jwt.sign(
        //   { username: user.username, email: user.email, id: user._id },
        //   process.env.JWTKEY,
        //   { expiresIn: "1h" }
        // );
        res.status(200).json({ message:"An Email sent to your account please verify"});
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    };
    
    export const verifyEmail = async(req,res)=>{
      try{
        const user = await UserModel.findOne({_id:req.params.id});
        if(!user) 
        res.status(400).json("Invalid link")
    
        const token = await TokenModel.findOne({
          userId:user._id,
          token:req.params.token
        });
        if(!token)
        res.status(400).json("Invalid link")
    
        await UserModel({_id:user._id,verified:true});
        await token.remove()
        res.status(200).json("Email verified successfully");
    
      }catch(error){
        console.log(error)
        res.status(500).json({ message: error.message });
      }
    
    }
    
    // Login User
    
    // Changed
    export const loginUser = async (req, res) => {
      const { username, password } = req.body;
    
      try {
        // const user = await UserModel.findOne({ username: username });
        const user = await UserModel.findOne({
          $or: [{ username: username }, { email: username }],
        });
    
        if (user) {
          if (user.isBlocked) {
            res.status(404).json("User is Blocked");
          } else {
            if(user.password){
            const validity = await bcrypt.compare(password, user.password);
    
            if (!validity) {
              res.status(400).json("Wrong password");
            } else {
              const token = jwt.sign(
                { username: user.username, id: user._id, email: user.email },
                process.env.JWTKEY,
                { expiresIn: "1h" }
              );
              res.status(200).json({ user, token });
            }
          }else{
            res.status(400).json("Sign in with google and create password");
          }
          }
        } else {
          res.status(404).json("User not found");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    };
    
    export const googleRegister = async (req, res) => {
      const { credential } = req.body;
    
      try {
        let decoded = await jwt_decode(credential);
    
        const { given_name, family_name, email, sub, picture } = decoded;
        const user = await UserModel.findOne({ googleId: sub });
        if (user) {
          if (user.isBlocked) {
            res.status(404).json("User is Blocked");
          } else {
            const token = jwt.sign(
              {
                username: user.username,
                id: user._id,
              },
              process.env.JWTKEY,
              { expiresIn: "1h" }
            );
            res.status(200).json({ user, token });
          }
        } else {
          const newUser = new UserModel({
            email: email,
            firstname: given_name,
            lastname: family_name,
            googleId: sub,
            profilePicture: picture,
            expiresAt: null,
          });
          const user = await newUser.save();
          const token = jwt.sign(
            {
              username: user.username,
              id: user._id,
            },
            process.env.JWTKEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({ user, token });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    };
    

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
